import { EParams, EStatuses } from '../types'

type ReutnParamsLevel = {
    name: EParams
    status: EStatuses
}

export function checkLevel(
    param: string,
    value: number
): ReutnParamsLevel | undefined {
    if (param.includes('temperature')) {
        if (value >= 75)
            return { name: EParams.TEMPERATURE, status: EStatuses.ERROR }
        if (value >= 65)
            return { name: EParams.TEMPERATURE, status: EStatuses.WARNING }
        else return { name: EParams.TEMPERATURE, status: EStatuses.AVAILABLE }
    }

    if (param === 'oil_level') {
        if (value < 10)
            return { name: EParams.OIL_LEVEL, status: EStatuses.ERROR }
        if (value < 20)
            return { name: EParams.OIL_LEVEL, status: EStatuses.WARNING }
        else return { name: EParams.OIL_LEVEL, status: EStatuses.AVAILABLE }
    }

    if (param.includes('vibration')) {
        if (value >= 7.1)
            return { name: EParams.VIBRATION, status: EStatuses.ERROR }
        if (value >= 4.5)
            return { name: EParams.VIBRATION, status: EStatuses.WARNING }
        else return { name: EParams.VIBRATION, status: EStatuses.AVAILABLE }
    }
}
