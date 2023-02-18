import React from 'react'
import { EColors } from '../../../utils'

type Props = {
    color?: EColors
}

export const Water: React.FC<Props> = ({ color = '#000000' }) => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.4988 10.5252C13.4988 13.2874 11.76 15.0262 8.99784 15.0262C6.23568 15.0262 4.49686 13.2874 4.49686 10.5252C4.49686 7.56112 7.7235 3.55962 8.71309 2.40218C8.7483 2.36106 8.792 2.32805 8.84118 2.30541C8.89036 2.28278 8.94386 2.27106 8.998 2.27106C9.05214 2.27106 9.10563 2.28278 9.15481 2.30541C9.20399 2.32805 9.24769 2.36106 9.2829 2.40218C10.2722 3.55962 13.4988 7.56112 13.4988 10.5252Z"
            stroke={color}
            stroke-width="1.00189"
            stroke-miterlimit="10"
        />
        <path
            d="M11.7501 10.7747C11.7501 11.3721 11.5129 11.9449 11.0905 12.3673C10.6681 12.7896 10.0953 13.0269 9.49799 13.0269"
            stroke={color}
            stroke-width="1.00189"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
)
