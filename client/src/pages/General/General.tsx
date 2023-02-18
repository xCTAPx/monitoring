import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { apiClient } from '../../apiClient'
import { MainLayout } from '../../layouts'
import { EStatuses, IParamInfo } from '../../types'
import { Pannel } from '../../UI'
import { Exhauster, Aglomachine } from './components'

const mockData: IParamInfo[] = [
    { name: 'Param 1', temperature: EStatuses.ERROR },
    { name: 'Param 2', vibration: EStatuses.WARNING },
    {
        name: 'Param 3',
        vibration: EStatuses.AVAILABLE,
        temperature: EStatuses.AVAILABLE,
        oilLevel: EStatuses.ERROR,
    },
    { name: 'Param 4', temperature: EStatuses.AVAILABLE },
    {
        name: 'Param 5',
        oilLevel: EStatuses.AVAILABLE,
        temperature: EStatuses.AVAILABLE,
    },
    { name: 'Param 6', temperature: EStatuses.WARNING },
    {
        name: 'Param 7',
        oilLevel: EStatuses.ERROR,
        temperature: EStatuses.WARNING,
    },
    {
        name: 'Param 8',
        temperature: EStatuses.AVAILABLE,
        vibration: EStatuses.WARNING,
    },
    {
        name: 'Param 9',
        temperature: EStatuses.AVAILABLE,
        oilLevel: EStatuses.WARNING,
    },
    {
        name: 'Param 10',
        oilLevel: EStatuses.ERROR,
        temperature: EStatuses.WARNING,
    },
    {
        name: 'Param 11',
        temperature: EStatuses.WARNING,
    },
    {
        name: 'Param 12',
        oilLevel: EStatuses.AVAILABLE,
        temperature: EStatuses.WARNING,
    },
    {
        name: 'Param 13',
        vibration: EStatuses.AVAILABLE,
    },
    {
        name: 'Param 14',
        oilLevel: EStatuses.ERROR,
        vibration: EStatuses.AVAILABLE,
    },
    {
        name: 'Param 15',
        temperature: EStatuses.AVAILABLE,
        vibration: EStatuses.ERROR,
    },
    {
        name: 'Param 16',
        temperature: EStatuses.AVAILABLE,
    },
    {
        name: 'Param 17',
        oilLevel: EStatuses.AVAILABLE,
    },
    {
        name: 'Param 18',
        oilLevel: EStatuses.WARNING,
    },
]

type Props = {}
type OpenDetailsParams = {
    id: number
}

const Content = styled.section`
    display: flex;
    justify-content: space-between;
`

export const General: React.FC<Props> = () => {
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
            console.log('response:', response)
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
                        status={EStatuses.AVAILABLE}
                        params={mockData}
                        onOpen={() => openDetails("Y-111")}
                    />
                    <Exhauster
                        name="Y-112"
                        status={EStatuses.WARNING}
                        params={mockData}
                        onOpen={() => openDetails("Y-112")}
                    />
                </Aglomachine>
                <Aglomachine number={2}>
                    <Exhauster
                        name="Y-121"
                        status={EStatuses.ERROR}
                        params={mockData}
                        onOpen={() => openDetails("Y-121")}
                    />
                    <Exhauster
                        name="Y-122"
                        status={EStatuses.ERROR}
                        params={mockData}
                        onOpen={() => openDetails("Y-122")}
                    />
                </Aglomachine>
                <Aglomachine number={3}>
                    <Exhauster
                        name="Y-211"
                        status={EStatuses.WARNING}
                        params={mockData}
                        onOpen={() => openDetails("Y-211")}
                    />
                    <Exhauster
                        name="Y-221"
                        status={EStatuses.ERROR}
                        params={mockData}
                        onOpen={() => openDetails("Y-221")}
                    />
                </Aglomachine>
            </Content>
        </MainLayout>
    )
}
