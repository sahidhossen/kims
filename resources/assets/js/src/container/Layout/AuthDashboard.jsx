/**
 * Created by sahidhossen on 28/7/18.
 */
import React from "react";
import { renderRoutes } from 'react-router-config'
import Switch from 'react-router-dom/Switch'
import PropTypes from 'prop-types'


export const AuthDashboard = ({ route, location}) =>(
    renderRoutes(route.routes)
)

AuthDashboard.propTypes = {
    route: PropTypes.object,
    location: PropTypes.object
}

export default AuthDashboard
