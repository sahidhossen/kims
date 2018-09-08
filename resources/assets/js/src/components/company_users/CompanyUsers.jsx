import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export const CompanyUsers = ({state, onFieldChange,addNewSolder, users}) => (
    <div className="content">
        <div className="row ">
            <div className="content">
                <div className="card">
                    <div className="card-header header-elements-inline">
                    add new user
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="flex-3 user-counter-box h-100">
                                <div className="total-user my-auto">
                                    <h3>Number of solder</h3>
                                    <h3>{users.users.length}</h3>
                                    <button type="submit" className="btn btn-primary btn-lg" >View</button>
                                </div>
                            </div>
                            <div className="flex-1 container">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" value={state.name} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Name"/>
                                </div>
                                <div className="form-group">
                                    <label>Mobile</label>
                                    <input type="text" className="form-control" name="mobile" value={state.mobile} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Mobile"/>
                                </div>
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input type="text" className="form-control" name="designation" value={state.designation} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Designation"/>
                                </div>
                                <div className="form-group">
                                    <label>Professional</label>
                                    <input type="text" className="form-control" name="professional" value={state.professional} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Professional"/>
                                </div>
                                <div className="form-group">
                                    <label>Secret ID</label>
                                    <input type="text" className="form-control" name="secret_id" value={state.secret_id} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Secret ID"/>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="text" className="form-control" name="password" value={state.password} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Password"/>
                                </div>

                                <button type="submit" className="btn btn-primary pull-right" onClick={(e) => addNewSolder(e)} >Add New Solder</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div className="row">
            <div className="content">
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
                                                <Link className="btn btn-info" to={`/dashboard/user/${user.id}`}> Details </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>

            </div>
        </div>
    </div>
)

CompanyUsers.propTypes = {
    onFieldChange: PropTypes.func,
    addNewSolder: PropTypes.func,
    state: PropTypes.object,
    users: PropTypes.object
}


export default CompanyUsers