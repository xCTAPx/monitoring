import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MainLayout } from '../../layouts'
import { EScreens, Switch } from '../../UI'
import { CeilInfo } from '../../UI/CeilInfo'
import { CeilInfoWhite } from '../../UI/CeilInfoWhite'
import { RangePanel } from '../../UI/RangePanel'
import { translate } from '../../helpers/disctionaryUnits'

type Props = {
    namesData: object,
    infoData: object
}

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
`


export const Details: React.FC<Props> = ({ namesData, infoData }) => {
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params;
    let infoCeils: React.ReactNode[] = [];
    //@ts-ignore
    pushCeils(infoCeils, namesData, infoData)
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
            {infoCeils}
            {/* <CeilInfoWhite data={infoData[0]} /> */}
        </Grid>
    </MainLayout>
}

function pushCeils(arr: React.ReactNode[], namesData: object, infoData: object) {


    //@ts-ignore
    //@ts-ignore
    // console.log(key, infoData)

    //@ts-ignore
    for (let valueKey in infoData['data']) {
        //@ts-ignore
        //@ts-ignore
        if (valueKey.includes('bearing')) {
            // console.log(valueKey)
            // console.log(namesData)
            //@ts-ignore

            const propsCeils = {
                //@ts-ignore
                title: namesData[valueKey]['name'],
                data: []
            }
            console.log()
            //@ts-ignore
            // const newRow = {
            //     //@ts-ignore
            //     label: 't',
            //     //@ts-ignore

            //     value: Math.round(infoData['data'][valueKey] as number)
            // }

            for (let rowKey in infoData['data'][valueKey]) {
                //@ts-ignore
                propsCeils.data.push({
                    label: translate(rowKey),
                    //@ts-ignore
                    value: Math.round(infoData['data'][valueKey][rowKey]) as number
                })

            }

            //@ts-ignore

            // propsCeils.data.push(newRow)
            arr.push(<CeilInfo key={Math.random()} data={propsCeils} />)

        }

    }
    //@ts-ignore

    // }
}