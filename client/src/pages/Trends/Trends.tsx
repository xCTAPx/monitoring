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
import namesData from '../../examples/names.json'
import mock from '../General/mock.json'

type Props = {}

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
    overflow-y: auto;
`

const data = [
    {
        name: '1',
        bearing1_temperature: Math.random() * 1000,
        bearing1_vibration_axial: Math.random() * 1000,
        bearing1_vibration_horizontal: Math.random() * 1000,
        bearing1_vibration_vertical: Math.random() * 1000,
        bearing2_temperature: Math.random() * 1000,
        bearing2_vibration_axial: Math.random() * 1000,
        bearing2_vibration_horizontal: Math.random() * 1000,
        bearing2_vibration_vertical: Math.random() * 1000,
        bearing3_temperature: Math.random() * 1000,
        bearing4_temperature: Math.random() * 1000,
        bearing5_temperature: Math.random() * 1000,
        bearing6_temperature: Math.random() * 1000,
        bearing7_temperature: Math.random() * 1000,
        bearing7_vibration_axial: Math.random() * 1000,
        bearing7_vibration_horizontal: Math.random() * 1000,
        bearing7_vibration_vertical: Math.random() * 1000,
        bearing8_temperature: Math.random() * 1000,
        bearing8_vibration_axial: Math.random() * 1000,
        bearing8_vibration_horizontal: Math.random() * 1000,
        bearing8_vibration_vertical: Math.random() * 1000,
        bearing9_temperature: Math.random() * 1000,
        cooler_temperature_oil_after: Math.random() * 1000,
        cooler_temperature_oil_before: Math.random() * 1000,
        cooler_temperature_water_after: Math.random() * 1000,
        cooler_temperature_water_before: Math.random() * 1000,
        gas_manifold_temperature_before: Math.random() * 1000,
        gas_manifold_underpressure_before: Math.random() * 1000,
        valve_position_gas_valve_open: Math.random() * 1000,
        main_drive_stator_current: Math.random() * 1000,
        oil_system_oil_level: Math.random() * 1000,
        oil_system_oil_pressure: Math.random() * 1000,
        equipment_work: Math.random() * 1000,
    },
    {
        name: '1',
        bearing1_temperature: Math.random() * 1000,
        bearing1_vibration_axial: Math.random() * 1000,
        bearing1_vibration_horizontal: Math.random() * 1000,
        bearing1_vibration_vertical: Math.random() * 1000,
        bearing2_temperature: Math.random() * 1000,
        bearing2_vibration_axial: Math.random() * 1000,
        bearing2_vibration_horizontal: Math.random() * 1000,
        bearing2_vibration_vertical: Math.random() * 1000,
        bearing3_temperature: Math.random() * 1000,
        bearing4_temperature: Math.random() * 1000,
        bearing5_temperature: Math.random() * 1000,
        bearing6_temperature: Math.random() * 1000,
        bearing7_temperature: Math.random() * 1000,
        bearing7_vibration_axial: Math.random() * 1000,
        bearing7_vibration_horizontal: Math.random() * 1000,
        bearing7_vibration_vertical: Math.random() * 1000,
        bearing8_temperature: Math.random() * 1000,
        bearing8_vibration_axial: Math.random() * 1000,
        bearing8_vibration_horizontal: Math.random() * 1000,
        bearing8_vibration_vertical: Math.random() * 1000,
        bearing9_temperature: Math.random() * 1000,
        cooler_temperature_oil_after: Math.random() * 1000,
        cooler_temperature_oil_before: Math.random() * 1000,
        cooler_temperature_water_after: Math.random() * 1000,
        cooler_temperature_water_before: Math.random() * 1000,
        gas_manifold_temperature_before: Math.random() * 1000,
        gas_manifold_underpressure_before: Math.random() * 1000,
        valve_position_gas_valve_open: Math.random() * 1000,
        main_drive_stator_current: Math.random() * 1000,
        oil_system_oil_level: Math.random() * 1000,
        oil_system_oil_pressure: Math.random() * 1000,
        equipment_work: Math.random() * 1000,
    },
    {
        name: '1',
        bearing1_temperature: Math.random() * 1000,
        bearing1_vibration_axial: Math.random() * 1000,
        bearing1_vibration_horizontal: Math.random() * 1000,
        bearing1_vibration_vertical: Math.random() * 1000,
        bearing2_temperature: Math.random() * 1000,
        bearing2_vibration_axial: Math.random() * 1000,
        bearing2_vibration_horizontal: Math.random() * 1000,
        bearing2_vibration_vertical: Math.random() * 1000,
        bearing3_temperature: Math.random() * 1000,
        bearing4_temperature: Math.random() * 1000,
        bearing5_temperature: Math.random() * 1000,
        bearing6_temperature: Math.random() * 1000,
        bearing7_temperature: Math.random() * 1000,
        bearing7_vibration_axial: Math.random() * 1000,
        bearing7_vibration_horizontal: Math.random() * 1000,
        bearing7_vibration_vertical: Math.random() * 1000,
        bearing8_temperature: Math.random() * 1000,
        bearing8_vibration_axial: Math.random() * 1000,
        bearing8_vibration_horizontal: Math.random() * 1000,
        bearing8_vibration_vertical: Math.random() * 1000,
        bearing9_temperature: Math.random() * 1000,
        cooler_temperature_oil_after: Math.random() * 1000,
        cooler_temperature_oil_before: Math.random() * 1000,
        cooler_temperature_water_after: Math.random() * 1000,
        cooler_temperature_water_before: Math.random() * 1000,
        gas_manifold_temperature_before: Math.random() * 1000,
        gas_manifold_underpressure_before: Math.random() * 1000,
        valve_position_gas_valve_open: Math.random() * 1000,
        main_drive_stator_current: Math.random() * 1000,
        oil_system_oil_level: Math.random() * 1000,
        oil_system_oil_pressure: Math.random() * 1000,
        equipment_work: Math.random() * 1000,
    },
    {
        name: '1',
        bearing1_temperature: Math.random() * 1000,
        bearing1_vibration_axial: Math.random() * 1000,
        bearing1_vibration_horizontal: Math.random() * 1000,
        bearing1_vibration_vertical: Math.random() * 1000,
        bearing2_temperature: Math.random() * 1000,
        bearing2_vibration_axial: Math.random() * 1000,
        bearing2_vibration_horizontal: Math.random() * 1000,
        bearing2_vibration_vertical: Math.random() * 1000,
        bearing3_temperature: Math.random() * 1000,
        bearing4_temperature: Math.random() * 1000,
        bearing5_temperature: Math.random() * 1000,
        bearing6_temperature: Math.random() * 1000,
        bearing7_temperature: Math.random() * 1000,
        bearing7_vibration_axial: Math.random() * 1000,
        bearing7_vibration_horizontal: Math.random() * 1000,
        bearing7_vibration_vertical: Math.random() * 1000,
        bearing8_temperature: Math.random() * 1000,
        bearing8_vibration_axial: Math.random() * 1000,
        bearing8_vibration_horizontal: Math.random() * 1000,
        bearing8_vibration_vertical: Math.random() * 1000,
        bearing9_temperature: Math.random() * 1000,
        cooler_temperature_oil_after: Math.random() * 1000,
        cooler_temperature_oil_before: Math.random() * 1000,
        cooler_temperature_water_after: Math.random() * 1000,
        cooler_temperature_water_before: Math.random() * 1000,
        gas_manifold_temperature_before: Math.random() * 1000,
        gas_manifold_underpressure_before: Math.random() * 1000,
        valve_position_gas_valve_open: Math.random() * 1000,
        main_drive_stator_current: Math.random() * 1000,
        oil_system_oil_level: Math.random() * 1000,
        oil_system_oil_pressure: Math.random() * 1000,
        equipment_work: Math.random() * 1000,
    },
]

export const Trends: React.FC<Props> = () => {
    const navigate = useNavigate()


    const openDetails = (id: string) => navigate(`/details/${id}`)

    const routeParams = useParams()
    const { id } = routeParams

    // const params = useMemo(() => getParamsList(data), [data])

    // @ts-ignore
    const data1 = mock[id]
    const params = []

    for (let key in data1.data) {
        const obj = data1.data[key]
        for (let prop in obj) {
            const props = `${key}_${prop}`
            params.push(props)
        }
    }

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
            // @ts-ignore
            screenTitle={namesData[id].name}
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
                                dataKey="bearing1_temperature"
                                stroke="#8884d8"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing1_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing1_vibration_axial"
                                stroke="#82ca9d"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing1_vibration_axial')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing1_vibration_horizontal"
                                stroke="#e69124"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing1_vibration_horizontal')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing1_vibration_vertical"
                                stroke="#221c9c"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing1_vibration_vertical')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing2_temperature"
                                stroke="#0b4622"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing2_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing2_vibration_axial"
                                stroke="#363431"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing2_vibration_axial')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing2_vibration_horizontal"
                                stroke="#e03f3f"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing2_vibration_horizontal')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing2_vibration_vertical"
                                stroke="#26ca65"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing2_vibration_vertical')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing3_temperature"
                                stroke="#e0921e"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing3_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing4_temperature"
                                stroke="#8a86e6"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing4_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing5_temperature"
                                stroke="#bec2c0"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing5_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing6_temperature"
                                stroke="#f5e0c0"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing6_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing7_temperature"
                                stroke="#807aff"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing7_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing7_vibration_axial"
                                stroke="#37a360"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing7_vibration_axial')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing7_vibration_horizontal"
                                stroke="#c01acf"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing7_vibration_horizontal')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing7_vibration_vertical"
                                stroke="#06c8f8"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing7_vibration_vertical')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing8_temperature"
                                stroke="#cfe605"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing8_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing8_vibration_axial"
                                stroke="#702494"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing8_vibration_axial')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing1_temperature"
                                stroke="#221c9c"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing1_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing8_vibration_horizontal"
                                stroke="#3e4d44"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing8_vibration_horizontal')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing8_vibration_vertical"
                                stroke="#84d663"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing8_vibration_vertical')}
                            />
                            <Line
                                type="monotone"
                                dataKey="bearing9_temperature"
                                stroke="#625f92"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('bearing9_temperature')}
                            />
                            <Line
                                type="monotone"
                                dataKey="cooler_temperature_oil_after"
                                stroke="#6cb186"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('cooler_temperature_oil_after')}
                            />
                            <Line
                                type="monotone"
                                dataKey="cooler_temperature_oil_before"
                                stroke="#97e020"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('cooler_temperature_oil_before')}
                            />
                            <Line
                                type="monotone"
                                dataKey="cooler_temperature_water_after"
                                stroke="#28ceb8"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('cooler_temperature_water_after')}
                            />
                            <Line
                                type="monotone"
                                dataKey="cooler_temperature_water_before"
                                stroke="#526836"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('cooler_temperature_water_before')}
                            />
                            <Line
                                type="monotone"
                                dataKey="gas_manifold_temperature_before"
                                stroke="#dfc093"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('gas_manifold_temperature_before')}
                            />
                            <Line
                                type="monotone"
                                dataKey="gas_manifold_underpressure_before"
                                stroke="#05015c"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('gas_manifold_underpressure_before')}
                            />
                            <Line
                                type="monotone"
                                dataKey="valve_position_gas_valve_open"
                                stroke="#a1b689"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('valve_position_gas_valve_open')}
                            />
                            <Line
                                type="monotone"
                                dataKey="main_drive_stator_current"
                                stroke="#40e083"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('main_drive_stator_current')}
                            />
                            <Line
                                type="monotone"
                                dataKey="oil_system_oil_level"
                                stroke="#472625"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('oil_system_oil_level')}
                            />
                            <Line
                                type="monotone"
                                dataKey="oil_system_oil_pressure"
                                stroke="#29a056"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('oil_system_oil_pressure')}
                            />
                            <Line
                                type="monotone"
                                dataKey="equipment_work"
                                stroke="#082d38"
                                strokeWidth={STROKE_WIDTH}
                                hide={!checkIfParamShown('equipment_work')}
                            />
                            <Brush />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartWrapper>
            </Content>
        </MainLayout>
    )
}
