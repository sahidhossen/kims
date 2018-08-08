/**
 * Created by sahidhossen on 28/7/18.
 */
import React from "react";
import ReactDOM from "react-dom";

import { renderRoutes } from 'react-router-config'
import { Provider } from "react-redux";
import Switch from 'react-router-dom/Switch'
import { BrowserRouter as Router } from 'react-router-dom'
import createStore from './src/reducer/createStore'
import routes from './src/components/routes'

const initialState = window.___INITIAL_STATE__ || {}
const store = createStore(initialState)

if (document.getElementById('kit_app')) {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Switch>{renderRoutes(routes)}</Switch>
            </Router>
        </Provider>
        , document.getElementById('kit_app'));
}