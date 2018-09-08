import React from 'react'
import PropTypes from 'prop-types'

export const CompanyUsers = ({state, onFieldChange,addNewSolder, users}) => (
    <div className="content">
        <div className="row">
            <div className="content">

                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-users"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Total Soldiers </p>
                        <h3 className="token-title"> {users.users.length} </h3>
                    </div>
                </div>

            </div>
        </div>
        <div className="row ">
            <div className="content">
                <div className="card kit-box-shadow">
                    <div className="card-header bg-red-light">
                        <h3 className="card-title"> Add New Soldier </h3>
                        {users.fetchingAddUser && <div className="lds-dual-ring"></div>}
                    </div>
                    <div className="card-body">
                        <div className="container kims-form">
                            <div className="form-group row align-items-center">
                                <div className="col"> <label>Name</label> </div>
                                <div className="col-10"> <input type="text" className="form-control" name="name" value={state.name} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Name"/></div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col"><label>Mobile</label></div>
                                <div className="col-10"><input type="text" className="form-control" name="mobile" value={state.mobile} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Mobile"/></div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col"><label>Designation</label></div>
                                <div className="col-10"> <input type="text" className="form-control" name="designation" value={state.designation} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Designation"/></div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col"><label>Professional</label></div>
                                <div className="col-10"><input type="text" className="form-control" name="professional" value={state.professional} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Professional"/></div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col"><label>Secret ID</label></div>
                                 <div className="col-10"> <input type="text" className="form-control" name="secret_id" value={state.secret_id} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Secret ID"/></div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col"><label>Password</label></div>
                                <div className="col-10"><input type="text" className="form-control" name="password" value={state.password} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter Password"/></div>
                            </div>
                            <div className="form-group row align-items-center">
                                <div className="col-9">
                                    { state.error !== '' &&
                                        <p className=" alert alert-danger"> {state.error} </p>
                                    }
                                    { state.success !== '' &&
                                    <p className=" alert alert-success"> {state.success} </p>
                                    }
                                </div>
                                <div className="col-3">
                                    <button type="submit" className="btn btn-primary btn-lg pull-right" onClick={(e) => addNewSolder(e)} >Add New Solder </button>
                                </div>
                            </div>
                        </div>
                    </div>

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