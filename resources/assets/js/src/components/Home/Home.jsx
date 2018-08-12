import React from 'react'

export const Home = () => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Home</span> - Dashboard</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>

                <div className="header-elements d-none">
                    <div className="d-flex justify-content-center">
                        <a href="#" className="btn btn-link btn-float text-default"><i className="icon-radio-checked2 text-primary"></i><span>Central</span></a>
                        <a href="#" className="btn btn-link btn-float text-default"><i className="icon-stack text-primary"></i> <span>District</span></a>
                        <a href="#" className="btn btn-link btn-float text-default"><i className="icon-drawer text-primary"></i> <span>Unit</span></a>
                        <a href="#" className="btn btn-link btn-float text-default"><i className="icon-library2 text-primary"></i> <span>Company</span></a>
                    </div>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">

                        </div>
                        <div className="card-body">
                            <h1> We Will Take Care Of It Later! </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Home