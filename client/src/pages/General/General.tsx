import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MainLayout } from '../../layouts'
import { EStatuses } from '../../types'
import { Pannel } from '../../UI'
import { Exhauster, Aglomachine } from './components'
import { mapData } from './mapper'
import names from '../../examples/names.json'
import { apiClient } from '../../apiClient'

type Props = {}
type OpenDetailsParams = {
    id: number
}

const Content = styled.section`
    display: flex;
    justify-content: space-between;
`

export const General: React.FC<Props> = () => {
    const [data, setData] = useState()
    const params = mapData(data, names)
    const navigate = useNavigate()

    const openDetails = (id: string, params?: OpenDetailsParams) =>
        navigate(`/details/${id}`, { state: params })

    useEffect(() => {
        async function fetchData() {
            const resp = await apiClient.get('/test')
            setData(resp)
        }
        try {
            fetchData()
        } catch (e) {
            console.error(e)
        }

        const intervalID = setInterval(fetchData, 5000)

        return () => clearInterval(intervalID)
    }, [])

    return (data ?
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
                        onOpen={() => openDetails('exhauster1')}
                    />
                    <Exhauster
                        name={params[1].name}
                        status={params[1].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[1].datetime}
                        params={params[1].data}
                        onOpen={() => openDetails('exhauster2')}
                    />
                </Aglomachine>
                <Aglomachine number={2}>
                    <Exhauster
                        name={params[2].name}
                        status={params[2].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[2].datetime}
                        params={params[2].data}
                        onOpen={() => openDetails('exhauster3')}
                    />
                    <Exhauster
                        name={params[3].name}
                        status={params[3].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[3].datetime}
                        params={params[3].data}
                        onOpen={() => openDetails('exhauster4')}
                    />
                </Aglomachine>
                <Aglomachine number={3}>
                    <Exhauster
                        name={params[4].name}
                        status={params[4].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[4].datetime}
                        params={params[4].data}
                        onOpen={() => openDetails('exhauster5')}
                    />
                    <Exhauster
                        name={params[5].name}
                        status={params[5].enabled ? EStatuses.AVAILABLE : EStatuses.ERROR}
                        date={params[5].datetime}
                        params={params[5].data}
                        onOpen={() => openDetails('exhauster6')}
                    />
                </Aglomachine>
            </Content>
        </MainLayout> : <p>Loading...</p>
    )
}
