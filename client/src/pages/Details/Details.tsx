import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MainLayout } from '../../layouts'
import { EScreens, Switch } from '../../UI'
import { CeilInfo } from '../../UI/CeilInfo'
import { CeilInfoWhite } from '../../UI/CeilInfoWhite'
import { RangePanel } from '../../UI/RangePanel'
import { disctionaryUnits } from '../../helpers/disctionaryUnits'
import { getBlockType, blockTypes } from '../../helpers/getBlockType'
import mock from '../General/mock.json'
import namesData from '../../examples/names.json'
import { checkLevel } from '../../utils/checkLevel'

type Props = {}

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
`


export const Details: React.FC<Props> = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params;
    let firstRow: React.ReactNode[] = [];
    let secondRow: React.ReactNode[] = [];
    //@ts-ignore
    pushCeils(firstRow, secondRow, namesData[id], mock[id])
    const openTrends = (id: string) => navigate(`/trends/${id}`)

    //@ts-ignore
    return <MainLayout title="Прогнозная аналитика эксгаустеров" screenTitle={namesData[id].name} slot={
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
        </Grid>
    </MainLayout>
}

function pushCeils(firstRow: React.ReactNode[], secondRow: React.ReactNode[], namesData: object, infoData: object) {

    //@ts-ignore
    for (let valueKey in infoData['data']) {




        if (valueKey === 'equipment') {
            continue;
        }
        const propsCeils = {
            //@ts-ignore
            title: namesData[valueKey]['name'],
            data: []
        }
        //@ts-ignore
        for (let rowKey in infoData['data'][valueKey]) {
            //@ts-ignore
            // console.log(valueKey)
            //@ts-ignore
            const level = checkLevel(rowKey, infoData['data'][valueKey][rowKey] );
            //@ts-ignore
            propsCeils.data.push({
                //@ts-ignore
                label: disctionaryUnits(rowKey),
                //@ts-ignore
                value: infoData['data'][valueKey][rowKey].toFixed(2) as number,
                status: level?.status || ''
            })


        }

        //@ts-ignore

        // propsCeils.data.push(newRow)
        const blockType = getBlockType(valueKey);
        if (blockType == blockTypes.SMALL_CEIL) {
            //@ts-ignore
            secondRow.push(<CeilInfo key={Math.random()} data={propsCeils}/>)
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