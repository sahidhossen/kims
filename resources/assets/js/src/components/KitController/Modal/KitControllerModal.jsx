import React from "react"
import PropTypes from 'prop-types'

export const KitControllerModal = (
        {
            hideModal, 
            onChangeAction, 
            addUser,
            kitControllers,
            addController,
            actionType,
            state
        }
    ) => (
    <div className="kit-modal-box-shadow">

        <div className="kit-modal-box">
            <div className="modal-header d-flex">
                <div className="flex-1">
                    <h1 className="modal-title"> Add Controller </h1>
                </div>
                <span className="close-modal" onClick={() => {hideModal()} }> <i className="fa fa-close"></i> </span>

            </div>
            <div className="modal-body">
                <div className="kit-form-body">
                    { state.error !== '' && <p className="alert-danger"> {state.error}</p> }
                    { actionType === "central" && (
                        <div>
                            <div className="form-group">
                                <label> Central Name <span className="required">x</span></label>
                                <input type="text" className="form-control" value={state.central_office.central_name} placeholder="Central Name" name="central_name" onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Details </label>
                                <textarea name="central_details" className="form-control" value={state.central_office.central_details} onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                        </div>
                    ) }

                    { actionType === "district" && (
                        <div>
                            <div className="form-group">
                                <label> Formation Name <span className="required">x</span></label>
                                <input type="text" className="form-control" value={state.formation_office.district_name} placeholder="Formation Name" name="district_name" onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Details </label>
                                <textarea name="district_details" className="form-control" value={state.formation_office.district_details} onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Select Central Office <span className="required">x</span></label>
                                <select className="form-control" name="central_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { kitControllers.central_offices.length > 0 && kitControllers.central_offices.map( (office, index) => (<option key={index} defaultValue={state.formation_office.central_office_id === office.id } value={office.id}> {office.central_name} </option>) )}
                                </select>
                            </div>
                        </div>
                    ) }

                    { actionType === "quarter_master" && (
                        <div>
                            <div className="form-group">
                                <label> Quarter Office Name <span className="required">x</span> </label>
                                <input type="text" className="form-control" value={state.unit.quarter_name} placeholder="Quarter Name" name="quarter_name" onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Details </label>
                                <textarea name="quarter_details" className="form-control" value={state.unit.quarter_details} onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Select Central Office <span className="required">x</span></label>
                                <select className="form-control" name="central_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { kitControllers.central_offices.length > 0 && kitControllers.central_offices.map( (office, index) => (<option key={index} defaultValue={state.unit.central_office_id === office.id } value={office.id}> {office.central_name} </option>) )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Select District Office <span className="required">x</span></label>
                                <select className="form-control" name="formation_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { state.filterFormation.length != 0 && state.filterFormation.map( (office, index) => (<option key={index} defaultValue={state.unit.formation_office_id === office.id } value={office.id}> {office.district_name} </option>) )}
                                </select>
                            </div>
                        </div>
                    ) }

                    { actionType === "unit" && (
                        <div>
                            <div className="form-group">
                                <label> Unit Name <span className="required">x</span> </label>
                                <input type="text" className="form-control" value={state.unit.unit_name} placeholder="Unit Name" name="unit_name" onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Details </label>
                                <textarea name="unit_details" className="form-control" value={state.unit.unit_details} onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Select Central Office <span className="required">x</span></label>
                                <select className="form-control" name="central_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { kitControllers.central_offices.length > 0 && kitControllers.central_offices.map( (office, index) => (<option key={index} defaultValue={state.unit.central_office_id === office.id } value={office.id}> {office.central_name} </option>) )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Select District Office <span className="required">x</span></label>
                                <select className="form-control" name="formation_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { state.filterFormation.length != 0 && state.filterFormation.map( (office, index) => (<option key={index} defaultValue={state.unit.formation_office_id === office.id } value={office.id}> {office.district_name} </option>) )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Select Quarter Master Office <span className="required">x</span></label>
                                <select className="form-control" name="quarter_master_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { state.filterQuarterMaster.length != 0 && state.filterQuarterMaster.map( (office, index) => (<option key={index} defaultValue={state.unit.quarter_master_id === office.id } value={office.id}> {office.quarter_name} </option>) )}
                                </select>
                            </div>
                        </div>
                    ) }

                    { actionType === "company" && (
                        <div>
                            <div className="form-group">
                                <label> Company Name <span className="required">x</span></label>
                                <input type="text" className="form-control" value={state.company.company_name} placeholder="Company Name" name="company_name" onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Details </label>
                                <textarea name="company_details" className="form-control" value={state.company.company_details} onChange={(e)=>{ onChangeAction(e) }} />
                            </div>
                            <div className="form-group">
                                <label> Select Central Office <span className="required">x</span></label>
                                <select className="form-control" name="central_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { kitControllers.central_offices.length > 0 && kitControllers.central_offices.map( (office, index) => (<option key={index} defaultValue={state.company.central_office_id === office.id } value={office.id}> {office.central_name} </option>) )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Select District Office <span className="required">x</span></label>
                                <select className="form-control" name="formation_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { state.filterFormation.length != 0 && state.filterFormation.map( (office, index) => (<option key={index} defaultValue={state.company.formation_office_id === office.id } value={office.id}> {office.district_name} </option>) )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Select Unit <span className="required">x</span></label>
                                <select className="form-control" name="unit_id" onChange={(e)=>{ onChangeAction(e) }}>
                                    <option value="0"> Select Office </option>
                                    { state.filterUnits.length > 0 && state.filterUnits.map( (office, index) => (<option key={index} defaultValue={state.company.unit_id === office.id } value={office.id}> {office.unit_name} </option>) )}
                                </select>
                            </div>
                        </div>
                    ) }

                    <div className="button-submit-area text-right">
                        <button type="submit" className="btn btn-primary" onClick={(e)=>{addController(e)}}> + Add</button>
                        {/*<button type="submit" className="btn btn-primary">Add And Exit</button>*/}
                    </div>

                </div>
            </div>
        </div>
    </div>
)

KitControllerModal.propTypes = {
    onChangeAction: PropTypes.func,
    hideModal: PropTypes.func,
    addController: PropTypes.func,
    filterFormation: PropTypes.func,
    actionType: PropTypes.string,
    state: PropTypes.object,
    kitControllers: PropTypes.object
}

export default KitControllerModal