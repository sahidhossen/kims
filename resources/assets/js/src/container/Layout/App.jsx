/**
 * Created by sahidhossen on 28/7/18.
 */
import React from "react";
import { renderRoutes } from 'react-router-config'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose'
import Switch from 'react-router-dom/Switch'
import PropTypes from 'prop-types'
// import Navbar from './Navbar'
// import Sidebar from './Sidebar'


export const App = ({ route, location}) =>(
    renderRoutes(route.routes)
)

App.propTypes = {
    route: PropTypes.object,
    location: PropTypes.object
}

export default App
