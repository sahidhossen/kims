import React from "react"
import PropTypes from 'prop-types'

export const UserModal = (
        {
            hideModal, 
            onChangeAction, 
            addUser,
            kitControllers,
            roles,
            state
        }
    ) => (
    <div className="kit-modal-box-shadow">
        <div className="kit-modal-box">
            <div className="modal-header d-flex">
                <div className="flex-1">
                    <h1 className="modal-title"> Add Solder </h1>
                </div>
                <span className="close-modal" onClick={() => {hideModal()} }> <i className="fa fa-close"></i> </span>
            </div>
            <div className="modal-body">
                { state.error !== '' && <p className="alert-danger"> {state.error}</p> }
                <div className="kit-form-body">
                    <div className="form-group">
                        <label> Name </label>
                        <input type="text" className="form-control" value={state.user.name} placeholder="Full Name" name="u_name" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> Designation </label>
                        <input type="text" className="form-control" value={state.user.designation} placeholder="Designation" name="designation" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> Professional </label>
                        <input type="text" className="form-control" value={state.user.professional} placeholder="Professional" name="professional" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> Mobile </label>
                        <input type="text" className="form-control" value={state.user.mobile} placeholder="Mobile" name="mobile" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> Password </label>
                        <input type="password" className="form-control" value={state.user.password} placeholder="Password" name="password" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> Secret ID <span className="required">*</span> </label>
                        <input type="text" className="form-control" placeholder="Secret ID" value={state.user.secret_id} name="secret_id" onChange={(e)=>{ onChangeAction(e) }} />
                    </div>
                    <div className="form-group">
                        <label> User Role <span className="required">*</span> </label>
                        <select className="form-control" name="user_role" onChange={(e)=>{ onChangeAction(e) }}>
                            { roles.fetched && roles.roles.map( (role) => (<option key={role.id} defaultValue={state.user.role === role.name } value={role.name}> {role.display_name} </option>) )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Select Central Office <span className="required">*</span></label>
                        <select className="form-control" name="central_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                            <option value="0"> Select Office </option>
                            { kitControllers.central_offices.length > 0 && kitControllers.central_offices.map( (office, index) => (<option key={index} defaultValue={state.user.central_office_id === office.id } value={office.id}> {office.central_name} </option>) )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Select District Office <span className="required">*</span></label>
                        <select className="form-control" name="formation_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                            <option value="0"> Select Office </option>
                            { state.filterDistrictOffices.length != 0 && state.filterDistrictOffices.map( (office, index) => (<option key={index} defaultValue={state.user.district_office_id === office.id } value={office.id}> {office.district_name} </option>) )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Select Unit <span className="required">*</span></label>
                        <select className="form-control" name="unit_id" onChange={(e)=>{ onChangeAction(e) }}>
                            <option value="0"> Select Office </option>
                            { state.filterUnit.length > 0 && state.filterUnit.map( (office, index) => (<option key={index} defaultValue={state.user.unit_id === office.id } value={office.id}> {office.unit_name} </option>) )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Select Company <span className="required">*</span></label>
                        <select className="form-control" name="company_id" onChange={(e)=>{ onChangeAction(e) }}>
                            <option value="0"> Select Company </option>
                            { state.filterCompany.length > 0 && state.filterCompany.map( (office, index) => (<option key={index} defaultValue={state.user.company_id === office.id } value={office.id}> {office.company_name} </option>) )}
                        </select>
                    </div>
                    <div className="button-submit-area text-right">
                        <button type="submit" className="btn btn-primary" onClick={(e)=>{addUser(e)}}>Add User</button>
                        {/*<button type="submit" className="btn btn-primary">Add And Exit</button>*/}
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
    roles: PropTypes.object,
    state: PropTypes.object,
    kitControllers: PropTypes.object
}

export default UserModal