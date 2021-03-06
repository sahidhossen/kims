import React from 'react'
import PropTypes from 'prop-types'

import Modal from './Modal'
import KitControllerDetails from './KitControllerDetails'
import SubControllerModal from './SubControllerModal'

export const KitController = ({
        kitControllers,
        addKitController,
        toggleModal,
        toggleRoleModal,
        hideRoleModal,
        deleteController,
        goNext,
        onChangeOfficeName,
        hideSubModal,
        enableEditMode,
        showSubModal,
        state
    }) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Central Office</span> - Dashboard</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
               <div className="content">
                   <div className="card">
                       <div className="card-header header-elements-inline">
                           <h5 className="card-title"> Central Offices </h5>
                           <div className="header-elements">
                               <div className="btn btn-primary" onClick={()=>{addKitController('central')}}> Add Central Office </div>
                           </div>
                       </div>
                       <div className="card-body">
                           <div className="d-flex flex-column bg-light border rounded p-2">
                               {kitControllers.central_offices.length > 0 && kitControllers.central_offices.map( (office, index) => (
                                   <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                       <div className="flex-row d-flex align-items-center">
                                           <div className="flex-1">
                                               {office.central_name}
                                           </div>
                                           <div className="operation-area">
                                               {office.head === null && <div className="btn btn-danger" onClick={(e)=>{deleteController('central',office, index)}}> Delete </div>}
                                               &nbsp;
                                               <div className="btn btn-info" onClick={(e)=>{toggleRoleModal('central',office)}}> {office.head === null  ? "Add Admin" : " Update Admin"} </div>
                                               &nbsp;
                                               <div className="btn btn-info" onClick={(e)=>{showSubModal('central_offices','formation_offices',office, index)}}> Formations </div>
                                           </div>
                                       </div>
                                   </div>
                               ))}

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
                            <h5 className="card-title"> Formation Offices </h5>
                            <div className="header-elements">
                                <div className="btn btn-primary" onClick={()=>{addKitController('district')}}> Add Formation Office </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                {kitControllers.formation_offices.length > 0 && kitControllers.formation_offices.map( (office, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1 office_name">
                                                {state.needUpdate.formation === null && <span className="office_text">{office.district_name}</span> }
                                                {state.needUpdate.formation === index && <input type="text" onChange={(e)=>onChangeOfficeName(e, office, index, 'formation_offices')} name="district_name" className="form-control" value={office.district_name}/>}
                                                {/*<span className="fa fa-edit office_edit_icon" onClick={(e)=>{enableEditMode('formation', index)}}/>*/}
                                            </div>
                                            <div className="operation-area">
                                                {office.head === null && <div className="btn btn-danger" onClick={(e)=>{deleteController('formation',office, index)}}> Delete </div>}
                                                &nbsp;
                                                <div className="btn btn-info" onClick={(e)=>{toggleRoleModal('formation',office)}}> {office.head === null  ? "Add Admin" : "View Admin"} </div>
                                                &nbsp;
                                                <div className="btn btn-info" onClick={(e)=>{showSubModal('formation_offices','quarters',office, index)}}> Quarters </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            <h5 className="card-title">Quarter Master</h5>
                            <div className="header-elements">
                                <div className="btn btn-primary" onClick={()=>{addKitController('quarter_master')}}> Add Quarter Master </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                {kitControllers.quarters.length > 0 && kitControllers.quarters.map( (office, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                                {office.quarter_name}
                                            </div>
                                            <div className="operation-area">
                                                {office.head === null && <div className="btn btn-danger" onClick={(e)=>{deleteController('quarter_master',office, index)}}> Delete </div>}
                                                &nbsp;
                                                <div className="btn btn-info" onClick={(e)=>{toggleRoleModal('quarter_master',office)}}> {office.head === null  ? "Add Admin" : "View Admin"} </div>
                                                &nbsp;
                                                <div className="btn btn-info" onClick={(e)=>{showSubModal('quarters','units',office, index)}}> Units </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            <h5 className="card-title">Units</h5>
                            <div className="header-elements">
                                <div className="btn btn-primary" onClick={()=>{addKitController('unit')}}> Add Unit </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                {kitControllers.units.length > 0 && kitControllers.units.map( (office, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                                {office.unit_name}
                                            </div>
                                            <div className="operation-area">
                                                {office.head === null && <div className="btn btn-danger" onClick={(e)=>{deleteController('unit',office, index)}}> Delete </div>}
                                                &nbsp;
                                                <div className="btn btn-info" onClick={(e)=>{toggleRoleModal('unit',office)}}> {office.head === null  ? "Add Admin" : "View Admin"} </div>
                                                &nbsp;
                                                <div className="btn btn-info" onClick={(e)=>{showSubModal('units','companies',office, index)}}> Companies </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            <h5 className="card-title">Companies</h5>
                            <div className="header-elements">
                                <div className="btn btn-primary" onClick={()=>{addKitController('company')}}> Add Company </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                {kitControllers.companies.length > 0 && kitControllers.companies.map( (office, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                                {office.company_name}
                                            </div>
                                            <div className="operation-area">
                                                {office.head === null && <div className="btn btn-danger" onClick={(e)=>{deleteController('company',office, index)}}> Delete </div>}
                                                &nbsp;
                                                <div className="btn btn-info" onClick={(e)=>{toggleRoleModal('company',office)}}> {office.head === null  ? "Add Admin" : "View Admin"} </div>
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
        { state.isRoleModalOn &&
            <KitControllerDetails
                closeModal={() => {hideRoleModal()}}
                roleType={state.roleType}
                office={state.office}
            />
        }
        { state.isModalOn &&
            <Modal
                closeModal={() => {toggleModal()}}
                actionType={state.actionType}
            /> }
        { state.isSubModal &&
        <SubControllerModal
            closeModal={() => {hideSubModal()}}
            subOffice={state.subOffice}
        /> }
    </div>
)

KitController.propTypes = {
    kitControllers: PropTypes.object,
    addKitController: PropTypes.func,
    toggleModal: PropTypes.func,
    hideRoleModal: PropTypes.func,
    toggleRoleModal: PropTypes.func,
    showSubModal: PropTypes.func,
    hideSubModal: PropTypes.func,
    goNext: PropTypes.func,
    deleteController: PropTypes.func,
    onChangeOfficeName: PropTypes.func,
    enableEditMode: PropTypes.func,
    state: PropTypes.object
}

export default KitController