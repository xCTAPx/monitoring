import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { apiClient } from '../../apiClient'
import { MainLayout } from '../../layouts'
import { EStatuses, IParamInfo } from '../../types'
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
    // apiClient.get('path', { id: 1 })
    const navigate = useNavigate()

    // below is example for navigation with params and dynamic path
    const openDetails = (id: number, params: OpenDetailsParams) => () =>
        navigate(`/details/${id}`, { state: params })

    // below is request example
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

    // <Button text="Text" onClick={() => {}} />
    // <h1 onClick={openDetails(1, { id: 2 })}>General</h1>

    const openExhauster = () => {}

    return (
        <MainLayout
            title="Прогнозная аналитика эксгаустеров"
            screenTitle="Главный экран"
        >
            <Content>
                <Aglomachine number={1}>
                    <Exhauster
                        name="Y-111"
                        status={EStatuses.AVAILABLE}
                        params={mockData}
                        onOpen={openExhauster}
                    />
                    <Exhauster
                        name="Y-112"
                        status={EStatuses.WARNING}
                        params={mockData}
                        onOpen={openExhauster}
                    />
                </Aglomachine>
                <Aglomachine number={2}>
                    <Exhauster
                        name="Y-121"
                        status={EStatuses.ERROR}
                        params={mockData}
                        onOpen={openExhauster}
                    />
                    <Exhauster
                        name="Y-122"
                        status={EStatuses.ERROR}
                        params={mockData}
                        onOpen={openExhauster}
                    />
                </Aglomachine>
                <Aglomachine number={3}>
                    <Exhauster
                        name="Y-211"
                        status={EStatuses.WARNING}
                        params={mockData}
                        onOpen={openExhauster}
                    />
                    <Exhauster
                        name="Y-221"
                        status={EStatuses.ERROR}
                        params={mockData}
                        onOpen={openExhauster}
                    />
                </Aglomachine>
            </Content>
        </MainLayout>
    )
}
