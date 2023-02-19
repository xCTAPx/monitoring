

const dict = {
    'temperature': 'T, °C',
    'vibration_horizontal': 'Г, мм/с',
    'vibration_vertical': 'В , мм/с',
    'vibration_axial': 'О, мм/с',
    'temperature_before': 'Разряжение, мм.в.ст³',
    'underpressure_before': 'Уровень пыли, мг/м³',
    'oil_level': 'Уровень масла, %',
    'gas_valve_open': '%',
    'temperature_oil_before': 'Масло на входе, °C',
    'temperature_oil_after': 'Масло на выходе, °C',
    'temperature_water_before': 'Вода на выходе, °C',
    'temperature_water_after': 'Вода на выходе, °C',
    'oil_pressure': 'Давление масла, %',
    'stator_current': "Ток, A",
    'work': 'В работe',
    'stator_voltage': 'Напряжение статора',
    'rotor_voltage': 'Напряжение ротора',
    "rotor_current": 'Ток ротора',
    'gas_valve_position': 'Положение задвижки газ'
}

export const disctionaryUnits = (string: string): string => {
    //@ts-ignore
    return dict[string] || string
}