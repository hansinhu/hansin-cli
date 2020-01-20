import axios from 'axios'
import retryAxios from 'axios-retry'
import Sentry from '@/setup/sentry'
import { utils } from '@/pages/components'

const instance = axios.create()

const igErrorCode = (code) => {
  return [401, 400, 402].includes(code)
}

retryAxios(instance, {
  retries: 5,
  retryDelay: retryAxios.exponentialDelay,
})

// api url
instance.defaults.baseURL = ''
// instance.defaults.timeout = 6000
// expect json response format
instance.defaults.headers.common['Accept'] = 'application/json'


instance.interceptors.request.use((config) => {
  let guest_id = localStorage.getItem('guest_id')

  if (!guest_id) {
    guest_id = utils.uuid()
    localStorage.setItem('guest_id', guest_id)
  }

  utils.cookie.set('guest_id', guest_id)
  config.headers.common['X-Requested-With'] = 'XMLHttpRequest'

  // 设备验证相关接口使用临时token tmp_authorization
  const tmp_auth_val = utils.cookie.get('tmp_authorization')
  const auth_val = config.is_tmp_auth && tmp_auth_val ? tmp_auth_val : utils.cookie.get('Authorization')
  config.headers.common['Authorization'] = auth_val

  // 注册接口需要device_id
  let device_id = utils.cookie.get('android_id') || utils.cookie.get('device_id')
  if (!device_id) {
    device_id = utils.webClientIDGenerator()
    utils.cookie.set('device_id', device_id, { expires: new Date('2099-09-09') })
  }

  // app前端直连club-api方案: http://wiki.yuceyi.com/pages/viewpage.action?pageId=27219588
  if (config.url.includes('/club-api') || config.url.includes('/gw/')) {
    config.headers.common['Client-Basic'] = JSON.stringify({
      country_code: utils.cookie.get('country_code'),
      language_code: utils.cookie.get('language') || 'en-US',
      gender: utils.cookie.get('gender') || 'F',
      guest_id: guest_id,
      from_site: 'app_site',
      experiment: utils.cookie.get('experiment'),
      android_id: utils.cookie.get('android_id'),
      device_id, // 设备验证依赖device_id
      _ga: utils.cookie.get('_ga'),
      v: utils.cookie.get('v'),
      model: utils.cookie.get('model'),
      os_version: utils.cookie.get('os_version'),
      network_type: utils.cookie.get('network_type'),
      channel: utils.cookie.get('channel'),
      adjust_adid: utils.cookie.get('adjust_adid'),
      isNew_customer: utils.cookie.get('isNew_customer'),
      is_new_user_area: utils.cookie.get('is_new_user_area'),
    })
  }
  return config
}, (error) => {
  const code = error?.response?.status
  !igErrorCode(code) && Sentry.captureException(error, {
    extra: {
      info: error,
      logger: 'instance.request',
    },
    logger: 'instance.request',
  })
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  const code = error?.response?.status
  !igErrorCode(code) && Sentry.captureException(error, {
    extra: {
      info: error,
      logger: 'app.response',
    },
    logger: 'app.response',
  })
  return Promise.reject(error)
})

export default instance
