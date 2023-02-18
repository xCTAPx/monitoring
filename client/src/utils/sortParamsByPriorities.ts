import { EStatuses, IParamInfo } from '../types'

export const sortParamsByPriorities = (params: IParamInfo[]) => {
    const paramsWithPriority = params.map((param) => {
        let priorityLevel = 0
        const { oilLevel, temperature, vibration } = param
        Object.values({ oilLevel, temperature, vibration }).forEach((val) => {
            if (val === EStatuses.ERROR) priorityLevel += 2
            else if (val === EStatuses.WARNING) priorityLevel += 1
        })

        return { priority: priorityLevel, ...param }
    })

    const sorted = paramsWithPriority.sort((a, b) => b.priority - a.priority)

    const withWarnings = sorted
        .filter((param) => param.priority)
        .map((elem) => ({
            name: elem.name,
            oilLevel: elem.oilLevel,
            temperature: elem.temperature,
            vibration: elem.vibration,
        }))
    const withoutWarnings = sorted
        .filter((param) => param.priority === 0)
        .map((elem) => ({
            name: elem.name,
            oilLevel: elem.oilLevel,
            temperature: elem.temperature,
            vibration: elem.vibration,
        }))

    return { withWarnings, withoutWarnings }
}
