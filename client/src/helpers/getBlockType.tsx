const dict = {
    'temperature': 'T, °C',
    'temperature_before': 'Разряжение, мм.в.ст³',
    'underpressure_before': 'Уровень пыли, мг/м³'
}
export enum blockTypes {
    SMALL_CEIL = 'smallCeil',
    BIG_CEIL = 'bigCeil',
    RANGE = 'range',
}

export const getBlockType = (string: string): string => {
    if (string.includes('bearing')) {
        return blockTypes.SMALL_CEIL
    } else if (
        string == 'main_drive' ||
        string == "cooler" ||
        string == 'gas_manifold'
    ) {
        return blockTypes.BIG_CEIL
    } else if (
        string == 'oil_system' ||
        string == 'valve_position'
    ) {
        return blockTypes.RANGE
    }
    return blockTypes.BIG_CEIL
    //@ts-ignore
}