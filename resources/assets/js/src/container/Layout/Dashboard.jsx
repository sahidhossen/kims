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
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const auth = true

export const Dashboard = ({ route, location }) =>(
    <div className="main-body">
        {/*navbar*/}
        <Navbar/>
        <div className="page-content">
            {/*sidebar*/}
            <Sidebar location={location}/>
            <div className="content-wrapper">
                {renderRoutes(route.routes)}
            </div>
        </div>
    </div>
)

Dashboard.propTypes = {
    route: PropTypes.object,
    location: PropTypes.object
}

const enhance = compose(
    connect(store => {
        return { oauth: store.oauth }
    }),
    lifecycle({
        componentDidMount() {

        },
        componentDidUpdate(nextProps) {
            if( this.props.location !== nextProps.location )
                window.scrollTo(0, 0)
        }
    })
)


export default enhance(Dashboard)
