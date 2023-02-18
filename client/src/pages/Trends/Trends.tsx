import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    Brush,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import styled from 'styled-components'
import { MainLayout } from '../../layouts'
import { Switch, EScreens } from '../../UI'
import { EColors } from '../../utils'
import { Row } from './components'
import { checkIsShown, getParamsList } from './utils'

type Props = {
}

export type IParam = {
    name: string
    isShown: boolean
}

const STROKE_WIDTH = 3

const Content = styled.div`
    display: flex;
`
const ChartWrapper = styled.div`
    width: 80%;
    height: 80vh;
`
const Menu = styled.div`
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    width: 20%;
    height: 80vh;
    border: 1px dashed ${EColors.background_primary};
    padding: 0 6px;
`

const data = [
    {
        name: '100 sec',
        parametr1: 200,
        parametr2: 100,
        parametr3: 190,
    },
    {
        name: '200 sec',
        parametr1: 240,
        parametr2: 120,
        parametr3: 90,
    },
    {
        name: '300 sec',
        parametr1: 255,
        parametr2: 124,
        parametr3: 70,
    },
    {
        name: '400 sec',
        parametr1: 256,
        parametr2: 129,
        parametr3: 65,
    },
    {
        name: '500 sec',
        parametr1: 265,
        parametr2: 127,
        parametr3: 61,
    },
    {
        name: '600 sec',
        parametr1: 271,
        parametr2: 141,
        parametr3: 71,
    },
    {
        name: '700 sec',
        parametr1: 269,
        parametr2: 142,
        parametr3: 54,
    },
]

export const Trends: React.FC<Props> = () => {
    const navigate = useNavigate()

    const openDetails = (id: string) => navigate(`/details/${id}`)

    const routeParams = useParams()
    const { id } = routeParams

    const params = useMemo(() => getParamsList(data), [data])
    const initialParamsList: IParam[] = useMemo(
        () => params.map((param) => ({ name: param, isShown: true })),
        [params]
    )

    const [paramsList, setParamsList] = useState<IParam[]>(initialParamsList)

    const checkIfParamShown = useCallback(
        (parametrName: string) => {
            return checkIsShown(paramsList, parametrName)
        },
        [paramsList]
    )

    const onChangeValue = useCallback((name: string, value: boolean) => {
        setParamsList((prevParams) =>
            prevParams.map((param) =>
                param.name === name
                    ? { ...param, isShown: value }
                    : { ...param }
            )
        )
    }, [])

    return (
        <MainLayout
            title="Прогнозная аналитика эксгаустеров"
            screenTitle={`Эксгаустер №${id}`}
            slot={
                <Switch
                    activeScreen={EScreens.TRENDS}
                    onFirstClick={() => openDetails(id?.toString() ?? '')}
                />
            }
        >
            <Content>
                <Menu>
                    {paramsList.map((param) => (
                        <Row
                            key={param.name}
                            name={param.name}
                            isSelected={param.isShown}
                            onChange={onChangeValue}
                        />
                    ))}
                </Menu>
                <ChartWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="parametr1"
                                stroke="#8884d8"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('parametr1')}
                            />
                            <Line
                                type="monotone"
                                dataKey="parametr2"
                                stroke="#82ca9d"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('parametr2')}
                            />
                            <Line
                                type="monotone"
                                dataKey="parametr3"
                                stroke="#e69124"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('parametr3')}
                            />
                            <Brush />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartWrapper>
            </Content>
        </MainLayout>
    )
}
