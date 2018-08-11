import React from "react"
import PropTypes from 'prop-types'

const roles = [ 
        { name:'central', id: 0},
        { name:'district', id: 1},
        { name:'unit', id: 2},
    ]

export const UserModal = (
        {
            hideModal, 
            onChangeAction, 
            addUser, 
            state
        }
    ) => (
    <div className="kit-modal-box-shadow">
        <div className="kit-modal-box">
            <div className="modal-header d-flex">
                <div className="flex-1">
                    <h1 className="modal-title"> Add User </h1>
                </div>
                <span className="close-modal" onClick={() => {hideModal()} }> <i className="fa fa-close"></i> </span>
            </div>
            <div className="modal-body">
                <div className="kit-form-body">
                    <div className="form-group">
                        <label> Name </label>
                        <input type="text" className="form-control" value={state.user.name} placeholder="User Name" name="u_name" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> Password </label>
                        <input type="password" className="form-control" value={state.user.password} placeholder="User Name" name="password" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> Access ID </label>
                        <input type="text" className="form-control" placeholder="User Name" value={state.user.secret_id} name="secret_id" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> User Role </label>
                        <select className="form-control" defaultValue={state.user.role}>
                            { roles.map( (role) => (<option key={role.id} defaultValue={state.user.role === role.id } value={role.id}> {role.name} </option>) )}
                        </select>
                    </div>
                    <div className="button-submit-area text-right">
                        <button type="submit" className="btn btn-primary" onClick={(e)=>{addUser(e)}}>Add User</button>
                        <button type="submit" className="btn btn-primary">Add And Exit</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
)

UserModal.propTypes = {
    onChangeAction: PropTypes.func,
    hideModal: PropTypes.func,
    addUser: PropTypes.func,
    state: PropTypes.object
}

export default UserModal