import React from 'react'
import Modal from './Modal'

export const User = () => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">User</span> - Dashboard</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            <h5 className="card-title"> Add User </h5>
                            <div className="header-elements">
                                <div className="btn btn-primary"> Add User </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            User Name
                                        </div>
                                        <div className="operation-area">
                                            <div className="btn btn-info"> Edit User </div>
                                            &nbsp;
                                            <div className="btn btn-danger"> Delete </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            User Name
                                        </div>
                                        <div className="operation-area">
                                            <div className="btn btn-info"> Edit User </div>
                                            &nbsp;
                                            <div className="btn btn-danger"> Delete </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            User Name
                                        </div>
                                        <div className="operation-area">
                                            <div className="btn btn-info"> Edit User </div>
                                            &nbsp;
                                            <div className="btn btn-danger"> Delete </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            User Name
                                        </div>
                                        <div className="operation-area">
                                            <div className="btn btn-info"> Edit User </div>
                                            &nbsp;
                                            <div className="btn btn-danger"> Delete </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Modal/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default User