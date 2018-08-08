import React from 'react'

export const Navbar = () => (
    <div className="navbar navbar-expand-md navbar-dark">
        <div className="navbar-brand">
            <a href="index.html" className="d-inline-block">
                KITS
            </a>
        </div>

        <div className="d-md-none">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                <i className="icon-tree5"></i>
            </button>
            <button className="navbar-toggler sidebar-mobile-main-toggle" type="button">
                <i className="icon-paragraph-justify3"></i>
            </button>
        </div>

        <div className="collapse navbar-collapse" id="navbar-mobile">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a href="#" className="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                        <i className="icon-paragraph-justify3"></i>
                    </a>
                </li>

                <li className="nav-item dropdown">
                    <a href="#" className="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown">
                        <i className="icon-git-compare"></i>
                        <span className="d-md-none ml-2">Git updates</span>
                        <span className="badge badge-pill bg-warning-400 ml-auto ml-md-0">9</span>
                    </a>

                    <div className="dropdown-menu dropdown-content wmin-md-350">
                        <div className="dropdown-content-header">
                            <span className="font-weight-semibold">Git updates</span>
                            <a href="#" className="text-default"><i className="icon-sync"></i></a>
                        </div>

                        <div className="dropdown-content-body dropdown-scrollable">
                            <ul className="media-list">
                                <li className="media">
                                    <div className="mr-3">
                                        <a href="#" className="btn bg-transparent border-primary text-primary rounded-round border-2 btn-icon"><i className="icon-git-pull-request"></i></a>
                                    </div>

                                    <div className="media-body">
                                        Drop the IE <a href="#">specific hacks</a> for temporal inputs
                                        <div className="text-muted font-size-sm">4 minutes ago</div>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <a href="#" className="btn bg-transparent border-warning text-warning rounded-round border-2 btn-icon"><i className="icon-git-commit"></i></a>
                                    </div>

                                    <div className="media-body">
                                        Add full font overrides for popovers and tooltips
                                        <div className="text-muted font-size-sm">36 minutes ago</div>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <a href="#" className="btn bg-transparent border-info text-info rounded-round border-2 btn-icon"><i className="icon-git-branch"></i></a>
                                    </div>

                                    <div className="media-body">
                                        <a href="#">Chris Arney</a> created a new <span className="font-weight-semibold">Design</span> branch
                                        <div className="text-muted font-size-sm">2 hours ago</div>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <a href="#" className="btn bg-transparent border-success text-success rounded-round border-2 btn-icon"><i className="icon-git-merge"></i></a>
                                    </div>

                                    <div className="media-body">
                                        <a href="#">Eugene Kopyov</a> merged <span className="font-weight-semibold">Master</span> and <span className="font-weight-semibold">Dev</span> branches
                                        <div className="text-muted font-size-sm">Dec 18, 18:36</div>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <a href="#" className="btn bg-transparent border-primary text-primary rounded-round border-2 btn-icon"><i className="icon-git-pull-request"></i></a>
                                    </div>

                                    <div className="media-body">
                                        Have Carousel ignore keyboard events
                                        <div className="text-muted font-size-sm">Dec 12, 05:46</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown-content-footer bg-light">
                            <a href="#" className="text-grey mr-auto">All updates</a>
                            <div>
                                <a href="#" className="text-grey" data-popup="tooltip" title="Mark all as read"><i className="icon-radio-unchecked"></i></a>
                                <a href="#" className="text-grey ml-2" data-popup="tooltip" title="Bug tracker"><i className="icon-bug2"></i></a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <span className="navbar-text ml-md-3 mr-md-auto">
				<span className="badge bg-success">Online</span>
			</span>

            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a href="#" className="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown">
                        <i className="icon-people"></i>
                        <span className="d-md-none ml-2">Users</span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right dropdown-content wmin-md-300">
                        <div className="dropdown-content-header">
                            <span className="font-weight-semibold">Users online</span>
                            <a href="#" className="text-default"><i className="icon-search4 font-size-base"></i></a>
                        </div>

                        <div className="dropdown-content-body dropdown-scrollable">
                            <ul className="media-list">
                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <a href="#" className="media-title font-weight-semibold">Jordana Ansley</a>
                                        <span className="d-block text-muted font-size-sm">Lead web developer</span>
                                    </div>
                                    <div className="ml-3 align-self-center"><span className="badge badge-mark border-success"></span></div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <a href="#" className="media-title font-weight-semibold">Will Brason</a>
                                        <span className="d-block text-muted font-size-sm">Marketing manager</span>
                                    </div>
                                    <div className="ml-3 align-self-center"><span className="badge badge-mark border-danger"></span></div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <a href="#" className="media-title font-weight-semibold">Hanna Walden</a>
                                        <span className="d-block text-muted font-size-sm">Project manager</span>
                                    </div>
                                    <div className="ml-3 align-self-center"><span className="badge badge-mark border-success"></span></div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <a href="#" className="media-title font-weight-semibold">Dori Laperriere</a>
                                        <span className="d-block text-muted font-size-sm">Business developer</span>
                                    </div>
                                    <div className="ml-3 align-self-center"><span className="badge badge-mark border-warning-300"></span></div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <a href="#" className="media-title font-weight-semibold">Vanessa Aurelius</a>
                                        <span className="d-block text-muted font-size-sm">UX expert</span>
                                    </div>
                                    <div className="ml-3 align-self-center"><span className="badge badge-mark border-grey-400"></span></div>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown-content-footer bg-light">
                            <a href="#" className="text-grey mr-auto">All users</a>
                            <a href="#" className="text-grey"><i className="icon-gear"></i></a>
                        </div>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <a href="#" className="navbar-nav-link dropdown-toggle caret-0" data-toggle="dropdown">
                        <i className="icon-bubbles4"></i>
                        <span className="d-md-none ml-2">Messages</span>
                        <span className="badge badge-pill bg-warning-400 ml-auto ml-md-0">2</span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right dropdown-content wmin-md-350">
                        <div className="dropdown-content-header">
                            <span className="font-weight-semibold">Messages</span>
                            <a href="#" className="text-default"><i className="icon-compose"></i></a>
                        </div>

                        <div className="dropdown-content-body dropdown-scrollable">
                            <ul className="media-list">
                                <li className="media">
                                    <div className="mr-3 position-relative">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>

                                    <div className="media-body">
                                        <div className="media-title">
                                            <a href="#">
                                                <span className="font-weight-semibold">James Alexander</span>
                                                <span className="text-muted float-right font-size-sm">04:58</span>
                                            </a>
                                        </div>

                                        <span className="text-muted">who knows, maybe that would be the best thing for me...</span>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3 position-relative">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>

                                    <div className="media-body">
                                        <div className="media-title">
                                            <a href="#">
                                                <span className="font-weight-semibold">Margo Baker</span>
                                                <span className="text-muted float-right font-size-sm">12:16</span>
                                            </a>
                                        </div>

                                        <span className="text-muted">That was something he was unable to do because...</span>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <div className="media-title">
                                            <a href="#">
                                                <span className="font-weight-semibold">Jeremy Victorino</span>
                                                <span className="text-muted float-right font-size-sm">22:48</span>
                                            </a>
                                        </div>

                                        <span className="text-muted">But that would be extremely strained and suspicious...</span>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <div className="media-title">
                                            <a href="#">
                                                <span className="font-weight-semibold">Beatrix Diaz</span>
                                                <span className="text-muted float-right font-size-sm">Tue</span>
                                            </a>
                                        </div>

                                        <span className="text-muted">What a strenuous career it is that I've chosen...</span>
                                    </div>
                                </li>

                                <li className="media">
                                    <div className="mr-3">
                                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" width="36" height="36" className="rounded-circle" alt=""/>
                                    </div>
                                    <div className="media-body">
                                        <div className="media-title">
                                            <a href="#">
                                                <span className="font-weight-semibold">Richard Vango</span>
                                                <span className="text-muted float-right font-size-sm">Mon</span>
                                            </a>
                                        </div>

                                        <span className="text-muted">Other travelling salesmen live a life of luxury...</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="dropdown-content-footer justify-content-center p-0">
                            <a href="#" className="bg-light text-grey w-100 py-2" data-popup="tooltip" title="Load more"><i className="icon-menu7 d-block top-0"></i></a>
                        </div>
                    </div>
                </li>

                <li className="nav-item dropdown dropdown-user">
                    <a href="#" className="navbar-nav-link dropdown-toggle" data-toggle="dropdown">
                        <img src="../../../../global_assets/images/placeholders/placeholder.jpg" className="rounded-circle" alt=""/>
                        <span>Victoria</span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right">
                        <a href="#" className="dropdown-item"><i className="icon-user-plus"></i> My profile</a>
                        <a href="#" className="dropdown-item"><i className="icon-coins"></i> My balance</a>
                        <a href="#" className="dropdown-item"><i className="icon-comment-discussion"></i> Messages <span className="badge badge-pill bg-blue ml-auto">58</span></a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item"><i className="icon-cog5"></i> Account settings</a>
                        <a href="#" className="dropdown-item"><i className="icon-switch2"></i> Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
)

export default Navbar