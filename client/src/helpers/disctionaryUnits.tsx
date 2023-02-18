const dict = {
    'temperature': 'T, °C',
    'vibration_horizontal': 'Г, мм/с',
    'vibration_vertical': 'В , мм/с',
    'vibration_axial': 'О, мм/с',
}

export const translate = (string: string): string => {
    //@ts-ignore
    return dict[string] || string
}