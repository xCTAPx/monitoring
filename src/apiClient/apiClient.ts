import ky from 'ky'
import { QueryParams } from './types'
import { convertObjectToUrlParams } from './utils'

const _ky = ky.create({ prefixUrl: '' })

class ApiClient {
    get(path: string, params?: QueryParams) {
        const searchParams = convertObjectToUrlParams(params)

        return _ky.get(path, { searchParams })
    }

    post(path: string, params?: object) {
        return _ky.post(path, { json: params })
    }

    put(path: string, params?: object) {
        return _ky.put(path, { json: params })
    }

    delete(path: string, params?: object) {
        return _ky.delete(path, { json: params })
    }
}

export const apiClient = new ApiClient()
