import React from 'react'
import PropTypes from 'prop-types'

export const UserForm = ({
    error,
    user,
    onChangeAction,
    addUser,
}) => (
    <div>
        { error !== '' &&
        <div className="alert-box"> <p className="alert-danger"> {error}</p> </div> }
        <div className="kit-form-body">

            <div className="form-group">
                <label> Name <span className="required">*</span></label>
                <input type="text" className="form-control" value={user.name} placeholder="Full Name" name="u_name" onChange={(e)=>{ onChangeAction(e) }} />
            </div>
            <div className="form-group">
                <label> Mobile <span className="required">*</span></label>
                <input type="text" className="form-control" value={user.mobile} placeholder="Mobile" name="mobile" onChange={(e)=>{ onChangeAction(e) }} />
            </div>
            <div className="d-flex flex-row">
                <div className="form-group flex-1">
                    <label> Designation <span className="required">*</span></label>
                    <input type="text" className="form-control" value={user.designation} placeholder="Designation" name="designation" onChange={(e)=>{ onChangeAction(e) }} />
                </div>
                <div className="form-group flex-1 px-1">
                    <label> Professional <span className="required">*</span></label>
                    <input type="text" className="form-control" value={user.professional} placeholder="Professional" name="professional" onChange={(e)=>{ onChangeAction(e) }} />
                </div>
            </div>
            <div className="d-flex flex-row">
                <div className="form-group flex-1">
                    <label> Password <span className="required">*</span></label>
                    <input type="password" className="form-control" value={user.password} placeholder="Password" name="password" onChange={(e)=>{ onChangeAction(e) }} />
                </div>
                <div className="form-group flex-1 px-1">
                    <label> Secret ID <span className="required">*</span> </label>
                    <input type="text" className="form-control" placeholder="Secret ID" value={user.secret_id} name="secret_id" onChange={(e)=>{ onChangeAction(e) }} />
                </div>
            </div>


            <div className="button-submit-area text-right">
                <button type="submit" className="btn btn-primary" onClick={(e)=>{addUser(e)}}>Add User</button>
            </div>

        </div>
    </div>
)

UserForm.propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    onChangeAction: PropTypes.func,
    addUser: PropTypes.func,
}

export default UserForm;