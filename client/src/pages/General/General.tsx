import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { apiClient } from '../../apiClient'
import { MainLayout } from '../../layouts'
import { EStatuses, IParamInfo } from '../../types'
import { Pannel } from '../../UI'
import { Exhauster, Aglomachine } from './components'
import mock from './mock.json'
import { mapData } from './mapper'
import names from '../../examples/names.json'

type Props = {}
type OpenDetailsParams = {
    id: number
}

const Content = styled.section`
    display: flex;
    justify-content: space-between;
`

export const General: React.FC<Props> = () => {
    const mockObj = JSON.parse(JSON.stringify(mock))
    const params = mapData(mockObj, names)
    const navigate = useNavigate()

    const openDetails = (id: string, params?: OpenDetailsParams) =>
        navigate(`/details/${id}`, { state: params })

    return (
        <MainLayout
            title="Прогнозная аналитика эксгаустеров"
            screenTitle="Главный экран"
        >
            <Pannel />
            <Content>
                <Aglomachine number={1}>
                    <Exhauster
                        name={params[0].name}
                        status={params[0].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[0].datetime}
                        params={params[0].data}
                        onOpen={() => openDetails("Y-111")}
                    />
                    <Exhauster
                        name={params[1].name}
                        status={params[1].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[1].datetime}
                        params={params[1].data}
                        onOpen={() => openDetails("Y-112")}
                    />
                </Aglomachine>
                <Aglomachine number={2}>
                    <Exhauster
                        name={params[2].name}
                        status={params[2].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[2].datetime}
                        params={params[2].data}
                        onOpen={() => openDetails("Y-121")}
                    />
                    <Exhauster
                        name={params[3].name}
                        status={params[3].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[3].datetime}
                        params={params[3].data}
                        onOpen={() => openDetails("Y-122")}
                    />
                </Aglomachine>
                <Aglomachine number={3}>
                    <Exhauster
                        name={params[4].name}
                        status={params[4].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[4].datetime}
                        params={params[4].data}
                        onOpen={() => openDetails("Y-211")}
                    />
                    <Exhauster
                        name={params[5].name}
                        status={params[5].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[5].datetime}
                        params={params[5].data}
                        onOpen={() => openDetails("Y-221")}
                    />
                </Aglomachine>
            </Content>
        </MainLayout>
    )
}

// function pushCeils(firstRow: React.ReactNode[], secondRow: React.ReactNode[], namesData: object, infoData: object) {

//     //@ts-ignore
//     for (let valueKey in infoData['data']) {
//         //@ts-ignore
//         console.log(infoData['data'])

//         //@ts-ignore

//         const propsCeils = {
//             //@ts-ignore
//             title: namesData[valueKey]['name'],
//             data: []
//         }
//         console.log()
//         //@ts-ignore
//         for (let rowKey in infoData['data'][valueKey]) {
//             //@ts-ignore
//             propsCeils.data.push({
//                 label: disctionaryUnits(rowKey),
//                 //@ts-ignore
//                 value: infoData['data'][valueKey][rowKey].toFixed(2) as number
//             })

//         }

//         //@ts-ignore

//         // propsCeils.data.push(newRow)
//         const blockType = getBlockType(valueKey);
//         if (blockType == blockTypes.SMALL_CEIL) {
//             secondRow.push(<CeilInfo key={Math.random()} data={propsCeils} />)
//         } else if (blockType == blockTypes.BIG_CEIL) {
//             secondRow.push(<CeilInfoWhite key={Math.random()} data={propsCeils} />)
//         } else if (blockType == blockTypes.RANGE) {
//             //@ts-ignore
//             firstRow.push(<RangePanel
//                 key={Math.random()}
//                 title={propsCeils.title}
//                 max={100}
//                 //@ts-ignore
//                 value={propsCeils.data[0].value}
//                 //@ts-ignore
//                 units={propsCeils.data[0].label} />)

//             if (valueKey == 'oil_system') {
//                 firstRow.push(<RangePanel
//                     key={Math.random()}
//                     title={propsCeils.title}
//                     max={6}
//                     //@ts-ignore
//                     value={propsCeils.data[1].value}
//                     //@ts-ignore
//                     units={propsCeils.data[1].label} />)
//             }
//         }

//         // костыли


//     }


//     //@ts-ignore

//     // }
// }
