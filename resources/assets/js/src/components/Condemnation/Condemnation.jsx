import React from 'react'
import PropTypes from 'prop-types'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import moment from 'moment'

export const Condemnation = ({
    onChangeAction,
    addCondemnation,
    onChangeSelectAction,
    condemnationEditAction,
    condemnationDeleteAction,
    kitControllers,
    condemnations,
    state
}) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Condemnation</span> - Dashboard</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            Add Condemnations
                        </div>
                        <div className="card-body">
                           <div className="condemnation-form">
                               <div className="d-flex flex-row">
                                   <div className="flex-1">
                                       <div className="form-group">
                                           <label htmlFor="condemnation-name"> Central Office <span className="required">*</span> </label>
                                           <select className="form-control" name="central_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                               <option value="0"> Select Office </option>
                                               { kitControllers.central_offices.length > 0 && kitControllers.central_offices.map( (office, index) => (<option key={index} defaultValue={state.condemnation.central_office_id === office.id } value={office.id}> {office.central_name} </option>) )}
                                           </select>
                                       </div>
                                   </div>
                                   <div className="flex-1 px-2">
                                       <div className="form-group">
                                           <label htmlFor="condemnation-name"> District Office <span className="required">*</span> </label>
                                           <select className="form-control" name="district_office_id" onChange={(e)=>{ onChangeAction(e) }}>
                                               <option value="0"> Select Office </option>
                                               { state.districtOfficeOptions.length > 0 && state.districtOfficeOptions.map( (office, index) => (<option key={index} defaultValue={state.condemnation.district_office_id === office.id } value={office.id}> {office.district_name} </option>) )}
                                           </select>
                                       </div>
                                   </div>
                                   <div className="flex-1">
                                       <div className="form-group">
                                           <label htmlFor="condemnation-name"> Unit Office <span className="required">*</span> </label>
                                           <select className="form-control" name="unit_id" onChange={(e)=>{ onChangeAction(e) }}>
                                               <option value="0"> Select Office </option>
                                               { state.unitOfficeOptions.length > 0 && state.unitOfficeOptions.map( (office, index) => (<option key={index} defaultValue={state.condemnation.unit_id === office.id } value={office.id}> {office.unit_name} </option>) )}
                                           </select>
                                       </div>
                                   </div>
                               </div>
                               <div className="d-flex flex-row">
                                   <div className="flex-1">
                                       <div className="form-group">
                                            <label htmlFor="condemnation-name"> Condemnation Name <span className="required">*</span> </label>
                                            <input type="text" value={state.condemnation.condemnation_name} name="condemnation_name" className="form-control" placeholder="Condemnation Name" onChange={(e)=>{ onChangeAction(e) }}/>
                                       </div>
                                   </div>
                                   <div className="flex-1 px-2">
                                       <div className="form-group">
                                           <label htmlFor="condemnation-name"> Condemnation Date <span className="required">*</span> </label>
                                           <DatePicker
                                               className="form-control"
                                               selected={state.condemnation._condemnation_date}
                                               onChange={(date)=>{onChangeSelectAction(date, "condemnation_date")}}
                                           />
                                       </div>
                                   </div>
                               </div>
                               <br/>
                               <div className="btn btn-info" onClick={(e)=> { addCondemnation(e)}}> Save </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            Active Condemnations
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            <strong> Name </strong>
                                        </div>
                                        <div className="flex-1">
                                            <strong> Start Date </strong>
                                        </div>
                                        <div className="action">
                                            <strong> Action </strong>
                                        </div>
                                    </div>
                                </div>
                                { condemnations.condemnation.length > 0 && condemnations.condemnation.map( (condemnation, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                                {condemnation.condemnation_name}
                                            </div>
                                            <div className="flex-1 px-1">
                                                {moment(condemnation.condemnation_date).format('YYYY-MM-DD') }
                                            </div>
                                            <div className="operation-area">
                                                {/*<div className="btn btn-info" onClick={(e)=> {condemnationEditAction(e, index)}}> Edit </div>*/}
                                                &nbsp;
                                                <div className="btn btn-danger" onClick={(e)=> {condemnationDeleteAction(e, condemnation.id)}}> Delete </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        { state.error !== '' &&
        <div className="alert-box"> <p className="alert-danger"> {state.error}</p> </div> }
    </div>
)

Condemnation.propTypes = {
    onChangeAction: PropTypes.func,
    onChangeSelectAction: PropTypes.func,
    addCondemnation: PropTypes.func,
    state: PropTypes.object,
    kitControllers: PropTypes.object,
    condemnations: PropTypes.object,
    condemnationEditAction: PropTypes.func,
    condemnationDeleteAction: PropTypes.func
}
export default Condemnation