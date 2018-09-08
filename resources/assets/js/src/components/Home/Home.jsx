import React from 'react'
import PropTypes from 'prop-types'
import Company from './components/Company'
import DefaultDashboard from './components/Default'

export const Home = ({users, oauth}) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Home</span> - Dashboard</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>

                <div className="header-elements d-none">
                    <div className="d-flex justify-content-center">
                        {oauth.user !== null && oauth.user.whoami === 'central' && <a href="#" className="btn btn-link btn-float text-default"><i className="icon-radio-checked2 text-primary"></i><span>Central</span></a> }
                        {oauth.user !== null && oauth.user.whoami === 'formation' && <a href="#" className="btn btn-link btn-float text-default"><i className="icon-stack text-primary"></i> <span>District</span></a>}
                        {oauth.user !== null && oauth.user.whoami === 'unit' && <a href="#" className="btn btn-link btn-float text-default"><i className="icon-drawer text-primary"></i> <span>Unit</span></a>}
                        {oauth.user !== null && oauth.user.whoami === 'company' && <a href="#" className="btn btn-link btn-float text-default"><i className="icon-library2 text-primary"></i> <span>Company</span></a>}
                    </div>
                </div>
            </div>
        </div>
        {oauth.user !== null && oauth.user.whoami === 'company' && <Company users={users.users}/> }
        {oauth.user !== null && oauth.user.whoami !== 'company' && <DefaultDashboard/> }

    </div>
)

Home.propTypes = {
    users: PropTypes.object,
    oauth: PropTypes.object
}
export default Home