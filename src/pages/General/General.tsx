import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../../apiClient'
import { Button } from '../../UI'

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

    // below is request example
    useEffect(() => {
        const fetchSomething = async () => {
            const response = await apiClient
                .post('https://jsonplaceholder.typicode.com/todos', {
                    a: 1,
                    b: true,
                })
                .json()
            console.log('response:', response)
        }

        fetchSomething()
    }, [])

    return (
        <>
            <Button text="Text" />
            <h1 onClick={openDetails(1, { id: 2 })}>General</h1>
        </>
    )
}
