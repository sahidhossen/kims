import React from 'react'

export const KitItem = () => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Kit Item</span> - List</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>

                <div className="header-elements d-none">
                    <div className="d-flex justify-content-center">
                        <div className="btn btn-primary"> Add Item </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            Kit Item List
                        </div>
                        <div className="card-body">
                            <h1> Kit Items Page </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default KitItem