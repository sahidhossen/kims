import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

export const User = ({ toggleModal, userEditAction, all_user, state }) => (
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
                                <div className="btn btn-primary" onClick={(e)=> { toggleModal(e) } }> Add User </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                { all_user.map( (user, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                                {user.name}
                                            </div>
                                            <div className="operation-area">
                                                <div className="btn btn-info" onClick={(e)=> {userEditAction(e, index)}}> Edit User </div>
                                                &nbsp;
                                                <div className="btn btn-danger"> Delete </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                            Karim
                                        </div>
                                        <div className="operation-area">
                                            <div className="btn btn-info" onClick={(e)=> {userEditAction(e)}}> Edit User </div>
                                            &nbsp;
                                            <div className="btn btn-danger"> Delete </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {state.isModalOn && 
                                <Modal 
                                closeModal={()=> toggleModal() } 
                                actionType={state.actionType}
                                user={state.user}
                                /> } 

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

User.propTypes = {
    toggleModal: PropTypes.func,
    userEditAction: PropTypes.func,
    state: PropTypes.object,
    all_user: PropTypes.array
}



export default User