import Axios, { Axios as TAxios } from 'axios'
import path from 'path'
import os from 'os'
import fs from 'fs'
import getPort from 'get-port'
import express from 'express'
import open from 'open'
import cors from 'cors'
import fsExtra from 'fs-extra'

const CONFIG_DIR = path.resolve(os.homedir(), '.config/tm')

export function setHyperionCtx(hypeCtx: string, axiosFn: TAxios) {
  // @ts-ignore
  axiosFn.defaults.headers['x-hype-ctx'] = hypeCtx
}

export function setTokenToCookie(token: string, axiosFn: TAxios) {
  axiosFn.defaults.headers.common.Cookie = `SSO_USER_TOKEN=${token}`
}

export function getToken(key: string) {
  const SESSION_FILE = path.resolve(CONFIG_DIR, key)

  if (fs.existsSync(SESSION_FILE)) {
    return fs.readFileSync(SESSION_FILE, 'utf8')
  }

  return ''
}

function setToken(key: string, val: string) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fsExtra.mkdirpSync(CONFIG_DIR)
  }

  const SESSION_FILE = path.resolve(CONFIG_DIR, key)
  fs.writeFileSync(SESSION_FILE, val)
}

const validateToken = function (token: string) {
  try {
    if (!token) {
      return Promise.resolve(false)
    }

    setTokenToCookie(token, Axios)
    return Promise.resolve(Axios.get('https://xxxxxx/getAll', {
      maxRedirects: 0,
    }).then(res => {
      return res.data != null && typeof res.data == 'object'
    }).catch(err => {
      console.log('validateToken 失败', err.response.data.message || err.message)
      return false
    }))
  } catch (e) {
    return Promise.reject(e)
  }
}

const readToken = async (): Promise<string> => {
  try {
    const port = await getPort()
    const domain = 'https://messenger.xxxxxx/'
    const url = `${domain}token?port=${port}`
    return new Promise(resolve => {
      let server = null as any
      const timerId = setTimeout(() => {
        resolve('')
        server.close()
      }, 30000)
      const app = express()
      app.use(cors())
      app.get('/msg', (req, res) => {
        const token = ((req.query.token || '') as string).trim()

        if (token) {
          resolve(token)
          res.setHeader('Connection', 'close')
          res.json({
            success: true,
          }).end()
        } else {
          resolve('')
        }

        server.close()
        clearTimeout(timerId)
      })
      server = app.listen(port, () => {
        open(url)
      })
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

const login = async () => {
  try {
    let token = getToken('libra-token')
    return Promise.resolve(validateToken(token)).then(async (isValid) => {
      if (isValid) {
        return
      } else {
        token = await readToken()
        console.log('---token', token)
        setToken('libra-token', token)
      }
      Promise.resolve(token)
    })
  } catch (e) {
    return Promise.reject(e)
  }
}

export default login
