import { Routes as DOMRoutes, Route, Navigate } from 'react-router-dom'
import { General, Details, Trends } from '../pages'
import infoData from '../examples/values.json'
import namesData from '../examples/names.json'

import mock from '../pages/General/mock.json'

export const Routes = () => {
    return (
        <DOMRoutes>
            <Route path="/" element={<Navigate to="/general" />} />
            <Route path="/general" element={<General />} />
            <Route path="/details/:id" element={<Details infoData={mock['exhauster1']} namesData={namesData['exhauster1']} />} />
            <Route path="/trends/:id" element={<Trends />} />
        </DOMRoutes>
    )
}
