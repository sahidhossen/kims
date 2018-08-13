import React from 'react'
import PropTypes from 'prop-types'

import Modal from './Modal'

export const KitController = ({
        kitControllers,
        addKitController,
        toggleModal,
        state
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
                                               <div className="btn btn-info"> Edit User </div>
                                               &nbsp;
                                               <div className="btn btn-danger"> Delete </div>
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
                                            <div className="flex-1">
                                                {office.district_name}
                                            </div>
                                            <div className="operation-area">
                                                <div className="btn btn-info"> Edit User </div>
                                                &nbsp;
                                                <div className="btn btn-danger"> Delete </div>
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
                                                <div className="btn btn-info"> Edit User </div>
                                                &nbsp;
                                                <div className="btn btn-danger"> Delete </div>
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
                                                <div className="btn btn-info"> Edit User </div>
                                                &nbsp;
                                                <div className="btn btn-danger"> Delete </div>
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
        { state.isModalOn &&
            <Modal
                closeModal={() => {toggleModal()}}
                actionType={state.actionType}
            /> }
    </div>
)

KitController.propTypes = {
    kitControllers: PropTypes.object,
    addKitController: PropTypes.func,
    toggleModal: PropTypes.func,
    state: PropTypes.object
}

export default KitController