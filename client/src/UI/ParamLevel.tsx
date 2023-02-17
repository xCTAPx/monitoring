import React from 'react'
import styled from 'styled-components'
import { EParams, EStatuses } from '../types'

type Colors = {
    mainColor: string
    bgColor: string
}

type Props = {
    param: EParams
    status: EStatuses
}

const Block = styled.div<Colors>`
    border-radius: 2px;
    border: 1px solid ${({ mainColor }) => mainColor};
    background-color: ${({ bgColor }) => bgColor};
    width: 28px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

function getColorsByStatus(status: EStatuses): Colors {
    switch (status) {
        case EStatuses.AVAILABLE:
            return { mainColor: '#CCCCCC', bgColor: '#F4F4F4' }
        case EStatuses.WARNING:
            return { mainColor: '#F69112', bgColor: '#FEF1DB' }
        case EStatuses.ERROR:
            return { mainColor: '#EB5835', bgColor: '#FCDBCB' }
        default:
            return { mainColor: '#EB5835', bgColor: '#FCDBCB' }
    }
}

export const ParamLevel: React.FC<Props> = ({ param, status }) => {
    let icon
    const { mainColor, bgColor } = getColorsByStatus(status)

    if (param === EParams.TEMPERATURE) {
        icon = (
            <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_392_14471)">
                    <path
                        d="M9.61594 9.97203C9.58037 9.94951 9.55106 9.91836 9.53074 9.88149C9.51042 9.84461 9.49974 9.8032 9.49969 9.76109V3.02609C9.49969 2.62827 9.34166 2.24674 9.06035 1.96543C8.77905 1.68413 8.39752 1.52609 7.99969 1.52609C7.60187 1.52609 7.22034 1.68413 6.93903 1.96543C6.65773 2.24674 6.49969 2.62827 6.49969 3.02609V9.76109C6.49963 9.80312 6.48897 9.84445 6.4687 9.88126C6.44844 9.91807 6.41922 9.94919 6.38375 9.97172C5.93945 10.2611 5.57836 10.6615 5.33617 11.1332C5.09398 11.6049 4.97908 12.1317 5.00282 12.6614C5.03857 13.4442 5.37923 14.182 5.95193 14.7169C6.52463 15.2519 7.28391 15.5414 8.06737 15.5238C8.85082 15.5061 9.59626 15.1825 10.1443 14.6223C10.6922 14.0621 10.9993 13.3098 10.9997 12.5261C10.9999 12.0188 10.8735 11.5195 10.6318 11.0735C10.3902 10.6275 10.041 10.2489 9.61594 9.97203V9.97203Z"
                        stroke={mainColor}
                        stroke-width="1.00189"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                    />
                    <path
                        d="M7.99964 4.02649V12.5265"
                        stroke={mainColor}
                        stroke-width="1.00189"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                    />
                    <path
                        d="M8.00056 14.0272C8.82959 14.0272 9.50166 13.3551 9.50166 12.5261C9.50166 11.697 8.82959 11.025 8.00056 11.025C7.17152 11.025 6.49945 11.697 6.49945 12.5261C6.49945 13.3551 7.17152 14.0272 8.00056 14.0272Z"
                        fill={mainColor}
                    />
                </g>
                <defs>
                    <clipPath id="clip0_392_14471">
                        <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(0 0.524902)"
                        />
                    </clipPath>
                </defs>
            </svg>
        )
    } else if (param === EParams.VIBRATION) {
        icon = (
            <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.50703 6.5322C7.01904 7.08147 6.74951 7.79068 6.74951 8.52541C6.74951 9.26015 7.01904 9.96936 7.50703 10.5186"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M10.5249 10.5186C11.0129 9.96936 11.2824 9.26015 11.2824 8.52541C11.2824 7.79068 11.0129 7.08147 10.5249 6.5322"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M5.91357 4.93918C5.0044 5.91184 4.49866 7.19355 4.49866 8.52496C4.49866 9.85637 5.0044 11.1381 5.91357 12.1107"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M12.1169 12.1107C13.0261 11.1381 13.5318 9.85637 13.5318 8.52496C13.5318 7.19355 13.0261 5.91184 12.1169 4.93918"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M13.8759 13.5253C15.1039 12.1489 15.7826 10.3688 15.7826 8.52425C15.7826 6.67968 15.1039 4.89958 13.8759 3.52316"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M4.15479 3.52316C2.92682 4.89958 2.24817 6.67968 2.24817 8.52425C2.24817 10.3688 2.92682 12.1489 4.15479 13.5253"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        )
    } else {
        icon = (
            <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.4988 10.5252C13.4988 13.2874 11.76 15.0262 8.99784 15.0262C6.23568 15.0262 4.49686 13.2874 4.49686 10.5252C4.49686 7.56112 7.7235 3.55962 8.71309 2.40218C8.7483 2.36106 8.792 2.32805 8.84118 2.30541C8.89036 2.28278 8.94386 2.27106 8.998 2.27106C9.05214 2.27106 9.10563 2.28278 9.15481 2.30541C9.20399 2.32805 9.24769 2.36106 9.2829 2.40218C10.2722 3.55962 13.4988 7.56112 13.4988 10.5252Z"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-miterlimit="10"
                />
                <path
                    d="M11.7501 10.7747C11.7501 11.3721 11.5129 11.9449 11.0905 12.3673C10.6681 12.7896 10.0953 13.0269 9.49799 13.0269"
                    stroke={mainColor}
                    stroke-width="1.00189"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        )
    }

    return (
        <Block mainColor={mainColor} bgColor={bgColor}>
            {icon}
        </Block>
    )
}
