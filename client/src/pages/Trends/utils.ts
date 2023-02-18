import { IParam } from './Trends'

export function getParamsList(data: object[]) {
    const keys = Object.keys(data[0])
    const withoutExceptKeys = keys.filter((key) => key !== 'name')

    return withoutExceptKeys
}

export function checkIsShown(paramsList: IParam[], name: string): boolean {
    const currentParam = paramsList.find((param) => param.name === name)

    return !!currentParam?.isShown
}
