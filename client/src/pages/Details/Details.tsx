import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MainLayout } from '../../layouts'
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
    // Below are examples for extracting params from path and state
    const params = useParams()
    const location = useLocation()
    console.log(location)
    console.log(params)

    return <MainLayout screenTitle='Эксгаустер' title='Эксгаустер номер один'>
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
