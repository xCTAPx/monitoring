import React from 'react'
import { EColors } from '../../../utils'

type Props = {
    color?: EColors
}

export const Vibration: React.FC<Props> = ({ color = '#000000' }) => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.50703 6.5322C7.01904 7.08147 6.74951 7.79068 6.74951 8.52541C6.74951 9.26015 7.01904 9.96936 7.50703 10.5186"
            stroke={color}
            stroke-width="1.00189"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M10.5249 10.5186C11.0129 9.96936 11.2824 9.26015 11.2824 8.52541C11.2824 7.79068 11.0129 7.08147 10.5249 6.5322"
            stroke={color}
            stroke-width="1.00189"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M5.91357 4.93918C5.0044 5.91184 4.49866 7.19355 4.49866 8.52496C4.49866 9.85637 5.0044 11.1381 5.91357 12.1107"
            stroke={color}
            stroke-width="1.00189"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M12.1169 12.1107C13.0261 11.1381 13.5318 9.85637 13.5318 8.52496C13.5318 7.19355 13.0261 5.91184 12.1169 4.93918"
            stroke={color}
            stroke-width="1.00189"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M13.8759 13.5253C15.1039 12.1489 15.7826 10.3688 15.7826 8.52425C15.7826 6.67968 15.1039 4.89958 13.8759 3.52316"
            stroke={color}
            stroke-width="1.00189"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M4.15479 3.52316C2.92682 4.89958 2.24817 6.67968 2.24817 8.52425C2.24817 10.3688 2.92682 12.1489 4.15479 13.5253"
            stroke={color}
            stroke-width="1.00189"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
)
