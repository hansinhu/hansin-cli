import Axios, { Axios as TAxios } from 'axios'
import login, { getToken, setTokenToCookie } from './login'

interface LibraAxios {
	hypeCtx?: string
}

const libraAxios = async (params?: LibraAxios): Promise<TAxios> => {
	const { hypeCtx } = params || {}
	const request = Axios.create({})
	if (hypeCtx) {
		// @ts-ignore
		request.defaults.headers['x-hype-ctx'] = hypeCtx
	}
	await login()
	const token = getToken('libra-token')
  setTokenToCookie(token, request)
	return request
}

export { libraAxios }

export default Axios
