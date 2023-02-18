const bearingRegex = /bearing/i

export function mapName(name: string) {
    const newName = name.includes('bearing')
        ? `№${name.replace(bearingRegex, '')} п-к`
        : name

    switch (newName) {
        case 'cooler':
            return 'Охладитель'
        case 'gas_manifold':
            return 'Газовый коллектор'
        case 'valve_position':
            return 'Положение клапана'
        case 'main_drive':
            return 'Главный привод'
        case 'oil_system':
            return 'Маслосистема'
        case 'equipment':
            return 'Оборудование'
        default:
            return newName
    }
}
