import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Modal from './Modal'

export const User = ({
    toggleModal,
    userEditAction,
    userDeleteAction,
    state,
    users
}) => (
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
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            <strong> Name </strong>
                                        </div>
                                        <div className="flex-1">
                                            <strong> Secret ID </strong>
                                        </div>
                                        <div className="action">
                                            <strong> Action </strong>
                                        </div>
                                    </div>
                                </div>
                                { users.users.length > 0 && users.users.map( (user, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                                {user.name}
                                            </div>
                                            <div className="flex-1 px-1">
                                                {user.secret_id}
                                            </div>
                                            <div className="operation-area">
                                                {/*<div className="btn btn-info" onClick={(e)=> {userEditAction(e, index)}}> Edit User </div>*/}
                                                { user.whoami === "solder" && <Link className="btn btn-info" to={`/dashboard/user/${user.id}`}> Details </Link> }

                                                { user.whoami === 'central' && <span className="badge-central"> Central Officer </span> }
                                                { user.whoami === 'formation' && <span className="badge-central"> Formation Head </span> }
                                                { user.whoami === 'unit' && <span className="badge-central"> Unit Head </span> }
                                                { user.whoami === 'company' && <span className="badge-central"> Company Head </span> }

                                                {/*<div className="btn btn-danger" onClick={(e)=> {userDeleteAction(e, index)}}> Delete </div>*/}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
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
    userDeleteAction : PropTypes.func,
    state: PropTypes.object,
    users: PropTypes.object
}



export default User