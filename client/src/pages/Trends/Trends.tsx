import React from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

type Props = {}

const data = [
    {
        name: '100 sec',
        parametr1: 200,
        parametr2: 100,
        parametr3: 190,
        timestamp: Date.now(), // this example shows that we can put any data to these objects
    },
    {
        name: '200 sec',
        parametr1: 240,
        parametr2: 120,
        parametr3: 90,
        timestamp: Date.now() + 10,
    },
    {
        name: '300 sec',
        parametr1: 255,
        parametr2: 124,
        parametr3: 70,
        timestamp: Date.now() + 20,
    },
    {
        name: '400 sec',
        parametr1: 256,
        parametr2: 129,
        parametr3: 65,
        timestamp: Date.now() + 30,
    },
    {
        name: '500 sec',
        parametr1: 265,
        parametr2: 127,
        parametr3: 61,
        timestamp: Date.now() + 40,
    },
    {
        name: '600 sec',
        parametr1: 271,
        parametr2: 141,
        parametr3: 71,
        timestamp: Date.now() + 50,
    },
    {
        name: '700 sec',
        parametr1: 269,
        parametr2: 142,
        parametr3: 54,
        timestamp: Date.now() + 60,
    },
]

export const Trends: React.FC<Props> = () => {
    return (
        <>
            <h1>Trends</h1>
            <LineChart
                width={730}
                height={250}
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
                    strokeWidth={3}
                />
                <Line
                    type="monotone"
                    dataKey="parametr2"
                    stroke="#82ca9d"
                    strokeWidth={3}
                />
                <Line
                    type="monotone"
                    dataKey="parametr3"
                    stroke="#e69124"
                    strokeWidth={3}
                />
            </LineChart>
        </>
    )
}
