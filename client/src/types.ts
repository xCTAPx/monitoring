export enum EStatuses {
    ERROR = 'Error',
    WARNING = 'Warning',
    AVAILABLE = 'Available',
}

export enum EParams {
    TEMPERATURE = 'Temperature',
    OIL_LEVEL = 'OilLevel',
    VIBRATION = 'Vibrations',
}

export interface IParamInfo {
    name: string
    vibration?: EStatuses | null
    temperature?: EStatuses | null
    oilLevel?: EStatuses | null
}
