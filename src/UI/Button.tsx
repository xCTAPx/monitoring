import React from 'react'
import { Button as BSButton } from 'react-bootstrap'

type Props = {
    text: string
    onClick: () => void
}

export const Button: React.FC<Props> = ({ text, onClick }) => {
    return (
        <BSButton variant="warning" onClick={onClick}>
            {text}
        </BSButton>
    )
}
