import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { apiClient } from '../../apiClient'
import { MainLayout } from '../../layouts'
import { EStatuses } from '../../types'
import { Pannel } from '../../UI'
import { Exhauster, Aglomachine } from './components'
import mock from './mock.json'
import { mapData } from './mapper'
import example from '../../examples/values.json'

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
    const params = mapData(example)
    const navigate = useNavigate()

    const openDetails = (id: string, params?: OpenDetailsParams) =>
        navigate(`/details/${id}`, { state: params })

    useEffect(() => {
        const fetchSomething = async () => {
            const response = await apiClient
                .post('https://jsonplaceholder.typicode.com/todos', {
                    a: 1,
                    b: true,
                })
                .json()
        }

        fetchSomething()
    }, [])

    return (
        <MainLayout
            title="Прогнозная аналитика эксгаустеров"
            screenTitle="Главный экран"
        >
            <Pannel />
            <Content>
                <Aglomachine number={1}>
                    <Exhauster
                        name="Y-111"
                        status={params[0].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[0].datetime}
                        params={params[0].data}
                        onOpen={() => openDetails("Y-111")}
                    />
                    <Exhauster
                        name="Y-112"
                        status={params[1].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[1].datetime}
                        params={params[1].data}
                        onOpen={() => openDetails("Y-112")}
                    />
                </Aglomachine>
                <Aglomachine number={2}>
                    <Exhauster
                        name="Y-121"
                        status={params[2].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[2].datetime}
                        params={params[2].data}
                        onOpen={() => openDetails("Y-121")}
                    />
                    <Exhauster
                        name="Y-122"
                        status={params[3].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[3].datetime}
                        params={params[3].data}
                        onOpen={() => openDetails("Y-122")}
                    />
                </Aglomachine>
                <Aglomachine number={3}>
                    <Exhauster
                        name="Y-211"
                        status={params[4].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[4].datetime}
                        params={params[4].data}
                        onOpen={() => openDetails("Y-211")}
                    />
                    <Exhauster
                        name="Y-221"
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
