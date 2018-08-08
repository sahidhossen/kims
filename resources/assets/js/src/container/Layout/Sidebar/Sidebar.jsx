import React from 'react'
import { Link } from 'react-router-dom'
import { USERS, DASHBOARD } from '../../../constants'

export const Sidebar = () => (
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
                            <div className="media-title font-weight-semibold">Victoria Baker</div>
                            <div className="font-size-xs opacity-50">
                                <i className="icon-pin font-size-sm"></i> &nbsp;Santa Ana, CA
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
                        <Link to={DASHBOARD} className="nav-link active">
                            <i className="icon-home4"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={USERS}> Users </Link>
                    </li>
                    <li className="nav-item nav-item-submenu">
                        <a href="#" className="nav-link"><i className="icon-copy"></i> <span>Layouts</span></a>

                        <ul className="nav nav-group-sub">
                            <li className="nav-item"><a href="index.html" className="nav-link active">Default layout</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Layout 2</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Layout 3</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    </div>
)

export default Sidebar