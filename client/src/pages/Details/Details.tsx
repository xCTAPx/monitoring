import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

type Props = {}

export const Details: React.FC<Props> = () => {
    // Below are examples for extracting params from path and state
    const params = useParams()
    const location = useLocation()
    console.log(location)
    console.log(params)

    return <h1>Details</h1>
}
