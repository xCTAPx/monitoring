import { QueryParams } from './types'

export const convertObjectToUrlParams = (
    params?: QueryParams
): URLSearchParams => {
    const searchParams = new URLSearchParams()
    if (params) {
        Object.keys(params).forEach((key) =>
            searchParams.append(key, params[key])
        )
    }

    return searchParams
}
