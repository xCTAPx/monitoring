import React from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../apiClient'

type Props = {}
type OpenDetailsParams = {
    id: number
}

export const General: React.FC<Props> = () => {
    // apiClient.get('path', { id: 1 })
    const navigate = useNavigate()

    // below is example for navigation with params and dynamic path
    const openDetails = (id: number, params: OpenDetailsParams) => () =>
        navigate(`/details/${id}`, { state: params })

    return (
        <>
            <h1 onClick={openDetails(1, { id: 2 })}>General</h1>
        </>
    )
}
