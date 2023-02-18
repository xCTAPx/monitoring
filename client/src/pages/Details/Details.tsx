import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MainLayout } from '../../layouts'
import { EScreens, Switch } from '../../UI'
import { CeilInfo } from '../../UI/CeilInfo'
import { CeilInfoWhite } from '../../UI/CeilInfoWhite'
import { RangePanel } from '../../UI/RangePanel'
import { disctionaryUnits } from '../../helpers/disctionaryUnits'
import { getBlockType, blockTypes } from '../../helpers/getBlockType'

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
    let firstRow: React.ReactNode[] = [];
    let secondRow: React.ReactNode[] = [];
    //@ts-ignore
    pushCeils(firstRow, secondRow, namesData, infoData)
    const openTrends = (id: string) => navigate(`/trends/${id}`)

    return <MainLayout title="Прогнозная аналитика эксгаустеров" screenTitle={`Эксгаустер №${id}`} slot={
        <Switch
            activeScreen={EScreens.SCHEMA}
            onSecondClick={() => openTrends(id?.toString() ?? '')}
        />
    }>
        <Grid>
            {firstRow}
        </Grid>

        <Grid>
            {secondRow}
            {/* <CeilInfoWhite data={infoData[0]} /> */}
        </Grid>
    </MainLayout>
}

function pushCeils(firstRow: React.ReactNode[], secondRow: React.ReactNode[], namesData: object, infoData: object) {

    //@ts-ignore
    for (let valueKey in infoData['data']) {
        //@ts-ignore
        console.log(infoData['data'])

        //@ts-ignore

        const propsCeils = {
            //@ts-ignore
            title: namesData[valueKey]['name'],
            data: []
        }
        console.log()
        //@ts-ignore
        for (let rowKey in infoData['data'][valueKey]) {
            //@ts-ignore
            propsCeils.data.push({
                label: disctionaryUnits(rowKey),
                //@ts-ignore
                value: infoData['data'][valueKey][rowKey].toFixed(2) as number
            })

        }

        //@ts-ignore

        // propsCeils.data.push(newRow)
        const blockType = getBlockType(valueKey);
        if (blockType == blockTypes.SMALL_CEIL) {
            secondRow.push(<CeilInfo key={Math.random()} data={propsCeils} />)
        } else if (blockType == blockTypes.BIG_CEIL) {
            secondRow.push(<CeilInfoWhite key={Math.random()} data={propsCeils} />)
        } else if (blockType == blockTypes.RANGE) {
            //@ts-ignore
            firstRow.push(<RangePanel
                key={Math.random()}
                title={propsCeils.title}
                max={100}
                //@ts-ignore
                value={propsCeils.data[0].value}
                //@ts-ignore
                units={propsCeils.data[0].label} />)

            if (valueKey == 'oil_system') {
                firstRow.push(<RangePanel
                    key={Math.random()}
                    title={propsCeils.title}
                    max={6}
                    //@ts-ignore
                    value={propsCeils.data[1].value}
                    //@ts-ignore
                    units={propsCeils.data[1].label} />)
            }
        }

        // костыли


    }


    //@ts-ignore

    // }
}