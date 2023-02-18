import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MainLayout } from '../../layouts'
import { EScreens, Switch } from '../../UI'
import { CeilInfo } from '../../UI/CeilInfo'
import { CeilInfoWhite } from '../../UI/CeilInfoWhite'
import { RangePanel } from '../../UI/RangePanel'

type Props = {}

const Grid = styled.div`
    display: flex;
`

const infoData = [
    {
        title: 'ПС - 1',
        data: [
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
        ]
    },
    {
        title: 'ПС - 1',
        data: [
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
        ]
    },
    {
        title: 'ПС - 1',
        data: [
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
        ]
    },
    {
        title: 'ПС - 1',
        data: [
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
        ]
    },
    {
        title: 'ПС - 1',
        data: [
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            },
            {
                label: "T C",
                value: 220
            }, {
                label: "T C",
                value: 220
            },
        ]
    }
]

export const Details: React.FC<Props> = () => {
    const navigate = useNavigate()

    const params = useParams()
    const { id } = params

    const openTrends = (id: string) => navigate(`/trends/${id}`)

    return <MainLayout title="Прогнозная аналитика эксгаустеров" screenTitle={`Эксгаустер №${id}`} slot={
        <Switch
            activeScreen={EScreens.SCHEMA}
            onSecondClick={() => openTrends(id?.toString() ?? '')}
        />
    }>
        <Grid>
            <RangePanel title="Маслобак" max={100} value={70} units={'°C'} />
            <RangePanel title="Заслонка" max={100} value={30} units={'%'} />
        </Grid>

        <Grid>
            {infoData.map(e => <CeilInfo data={e} />)}
            <CeilInfoWhite data={infoData[0]} />
        </Grid>
    </MainLayout>
}
