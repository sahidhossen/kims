import React from 'react'
import PropTypes from 'prop-types'

export const Companies = () => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Unit Name </span> - All Company List</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">
                    Company list will show here
                </div>
            </div>
        </div>
    </div>
)

Companies.propTypes = {
    Companies: PropTypes.object,
}

export default Companies
