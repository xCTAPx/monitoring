import { Routes as DOMRoutes, Route, Navigate } from 'react-router-dom'
import { General, Details, Trends } from '../pages'

export const Routes = () => {
    return (
        <DOMRoutes>
            <Route path="/" element={<Navigate to="/general" />} />
            <Route path="/general" element={<General />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/trends" element={<Trends />} />
        </DOMRoutes>
    )
}
