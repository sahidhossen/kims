import React from 'react'
import PropTypes from 'prop-types'

export const KitControllerDetails = ({
    deleteAdmin,
    state
}) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold"> Central Office Administrator</span> - Dashboard</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">

                </div>
            </div>
        </div>
    </div>
)

KitControllerDetails.propTypes = {
    state: PropTypes.object,
    office: PropTypes.object,
    deleteAdmin: PropTypes.func
}

export default KitControllerDetails