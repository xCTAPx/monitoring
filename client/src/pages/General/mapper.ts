import dayjs from 'dayjs'
import { EParams, EStatuses, IParamInfo } from '../../types'
import { mapName } from '../../utils'
import { checkLevel } from '../../utils/checkLevel'

type Obj = {
    [key: string]: any
}

function constructParams(obj: any) {
    const res = []
    if (obj.temperature) {
        res.push(checkLevel('temperature', obj.temperature))
    }
    if (obj.oil_level) {
        res.push(checkLevel('oil_level', obj.oil_level))
    }
    if (
        obj.vibration_axial ||
        obj.vibration_horizontal ||
        obj.vibration_vertical
    ) {
        const maxVibration = Math.max(
            obj.vibration_axial,
            obj.vibration_horizontal,
            obj.vibration_vertical
        )
        res.push(checkLevel('vibration', maxVibration))
    }

    return res
}

function mapParams(data: Obj) {
    const res = []

    for (let key in data) {
        const name = mapName(key)
        const obj = data[key]

        const props = constructParams(obj)
        res.push({
            name,
            params: props,
        })
    }

    return res
}

export function mapData(data: Obj): any[] {
    const res = []

    for (let key in data) {
        const parameters = mapParams(data[key].data)
        const arr: any = []
        parameters.forEach((p) => {
            const obj: any = {}

            obj.name = p.name
            const tempEl = p.params.find(
                (el) => el?.name === EParams.TEMPERATURE
            )
            const vibrEl = p.params.find((el) => el?.name === EParams.VIBRATION)
            const oilEl = p.params.find((el) => el?.name === EParams.OIL_LEVEL)
            if (tempEl) {
                obj.temperature = tempEl.status
            }
            if (vibrEl) {
                obj.vibration = vibrEl.status
            }
            if (oilEl) {
                obj.oilLevel = oilEl.status
            }

            arr.push(obj)
        })

        res.push({
            ...data[key],
            name: 'Эксгаустер',
            datetime: dayjs(data[key].datetime).format('hh:mm DD.MM.YYYY'),
            data: arr,
            enabled: !!data[key].data.equipment.work,
        })
    }

    return res
}
