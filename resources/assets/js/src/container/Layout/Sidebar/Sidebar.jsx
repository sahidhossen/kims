import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { USERS, DASHBOARD, CONTROLLER, KIT_ITEMS, ITEM_TYPES, CONDEMNATION,COMPANY_USERS, COMPANY_ADD_USERS } from '../../../constants'

export const Sidebar = ({ location, oauth }) => (
    <div className="sidebar sidebar-dark sidebar-main sidebar-expand-md">
        <div className="sidebar-mobile-toggler text-center">
            <a href="#" className="sidebar-mobile-main-toggle">
                <i className="icon-arrow-left8"></i>
            </a>
            Navigation
            <a href="#" className="sidebar-mobile-expand">
                <i className="icon-screen-full"></i>
                <i className="icon-screen-normal"></i>
            </a>
        </div>

        <div className="sidebar-content">
            <div className="sidebar-user">
                <div className="card-body">
                    <div className="media">
                        <div className="mr-3">
                            <a href="#"><img src={`../images/placeholder.jpg`} width="38" height="38" className="rounded-circle" alt=""/></a>
                        </div>

                        <div className="media-body">
                            <div className="media-title font-weight-semibold">
                                {oauth.user !== null &&  oauth.user.whoami === 'company' && "Company"}
                                {oauth.user !== null &&  oauth.user.whoami === 'unit' && "Unit"}
                                {oauth.user !== null &&  oauth.user.whoami === 'solder' && "Solder"}
                                {oauth.user !== null &&  oauth.user.whoami === 'formation' && "Formation"}
                                {oauth.user !== null &&  oauth.user.whoami === 'central' && "Central"}
                            </div>
                            <div className="font-size-xs opacity-50">
                                <i className="icon-pin font-size-sm"></i> &nbsp; Manage Resource
                            </div>
                        </div>

                        <div className="ml-3 align-self-center">
                            <a href="#" className="text-white"><i className="icon-cog3"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/*Main navigation */}
            <div className="card card-sidebar-mobile">
                <ul className="nav nav-sidebar" data-nav-type="accordion">

                    <li className="nav-item-header"><div className="text-uppercase font-size-xs line-height-xs">Main</div> <i className="icon-menu" title="Main"></i></li>
                    <li className="nav-item">
                        <Link to={DASHBOARD} className={location.pathname === DASHBOARD ? 'nav-link active' : 'nav-link'}>
                            <i className="icon-home4"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {oauth.user !== null &&  oauth.user.whoami === 'central' &&
                        <li className="nav-item">
                            <Link className={location.pathname === CONTROLLER ? 'nav-link active' : 'nav-link'} to={CONTROLLER}> Controller </Link>
                        </li>
                     }

                     {oauth.user !== null &&  oauth.user.whoami === 'company' &&
                        <li className="nav-item">
                            <Link className={location.pathname === COMPANY_ADD_USERS ? 'nav-link active' : 'nav-link'} to={COMPANY_ADD_USERS}>
                                <i className="icon-plus3"></i>
                                Add Soldier
                            </Link>
                        </li>
                     }
                    {oauth.user !== null &&  oauth.user.whoami === 'company' &&
                    <li className="nav-item">
                        <Link className={location.pathname === COMPANY_USERS ? 'nav-link active' : 'nav-link'} to={COMPANY_USERS}>
                            <i className="icon-list-unordered"></i>
                            All Soldiers
                        </Link>
                    </li>
                    }

                    {oauth.user !== null &&  oauth.user.whoami === 'central' &&
                        <li className="nav-item">
                            <Link className={location.pathname === KIT_ITEMS ? 'nav-link active' : 'nav-link'} to={KIT_ITEMS}> Kit Items </Link>
                        </li>
                    }
                    {oauth.user !== null &&  oauth.user.whoami === 'central' &&
                        <li className="nav-item">
                            <Link className={location.pathname === ITEM_TYPES ? 'nav-link active' : 'nav-link'} to={ITEM_TYPES}> Item Types </Link>
                        </li>
                    }
                    {oauth.user !== null &&  oauth.user.whoami === 'unit' &&
                        <li className="nav-item">
                            <Link className={location.pathname === CONDEMNATION ? 'nav-link active' : 'nav-link'} to={CONDEMNATION}> Condemnation </Link>
                        </li>
                    }
                    {/*<li className="nav-item nav-item-submenu">*/}
                        {/*<a href="#" className="nav-link"><i className="icon-copy"></i> <span>Layouts</span></a>*/}

                        {/*<ul className="nav nav-group-sub" style={{ display: 'block'}}>*/}
                            {/*<li className="nav-item"><a href="index.html" className="nav-link active">Default layout</a></li>*/}
                            {/*<li className="nav-item"><a href="#" className="nav-link">Layout 2</a></li>*/}
                            {/*<li className="nav-item"><a href="#" className="nav-link">Layout 3</a></li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                </ul>
            </div>

        </div>
    </div>
)

Sidebar.propTypes = {
    location: PropTypes.object,
    oauth: PropTypes.object
}

export default Sidebar