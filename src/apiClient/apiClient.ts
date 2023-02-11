import ky from 'ky'

class ApiClient {
    get(path: string, params: object) {
        ky.get(path, params)
    }

    post(path: string, params: object) {
        ky.post(path, params)
    }

    put(path: string, params: object) {
        ky.put(path, params)
    }

    delete(path: string, params: object) {
        ky.delete(path, params)
    }
}

export const apiClient = new ApiClient()
