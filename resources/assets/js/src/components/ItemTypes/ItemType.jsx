import React from 'react'
import PropTypes from 'prop-types'
import ItemProblem from './ItemProblem'

export const KitItem = ({
    kitTypes,
    addKitType,
    openModal,
    onChangeAction,
    kitTypeEditAction,
    state
}) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Kit Type</span> - List</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>

                <div className="header-elements d-none">
                    <div className="d-flex justify-content-center">
                        {/*<div className="btn btn-primary"> Add Item </div>*/}
                    </div>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            <h3> Add Kit Types </h3>
                            <div className="header-elements d-none">
                                <div className="d-flex justify-content-center">
                                    {/*<div className="btn btn-primary"> Add Type </div>*/}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="add-kit-types-box flex-row d-flex">
                                <div className="flex-1 input-box">
                                    <input type="text" className="form-control" placeholder="Kit Name" defaultValue={state.kitType.type_name} name="type_name" onChange={(e)=>{onChangeAction(e)}} />
                                </div>
                                <div className="flex-1 details-input-box">
                                    <input type="text" className="form-control" placeholder="Kit Details (optional)" value={state.kitType.details} name="details" onChange={(e)=>{onChangeAction(e)}}/>
                                </div>
                                <div className="action-btn">
                                    <div className="btn btn-info" onClick={(e)=>{ addKitType(e)}}> + Add </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column bg-light border rounded p-2">
                                <div className="bg-teal-400 py-3 px-2  border-top-1 list-header">
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            <strong>Kit Name</strong>
                                        </div>
                                        <div className="flex-1">
                                            <strong>Central Office</strong>
                                        </div>
                                        <div className="operation-area">
                                            <strong> Actions </strong>
                                        </div>
                                    </div>
                                </div>
                                { kitTypes.kitTypes.length > 0 && kitTypes.kitTypes.map( (type, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                               {type.type_name}
                                            </div>
                                            <div className="flex-1">
                                                {type.details}
                                            </div>
                                            <div className="operation-area">
                                                <div className="btn btn-info" onClick={(e)=> {kitTypeEditAction(e, index)}}> Edit </div>
                                                &nbsp;
                                                {/*<div className="btn btn-danger" onClick={(e)=> {userDeleteAction(e, index)}}> Delete </div>*/}
                                                <div className="btn btn-primary" onClick={()=>{openModal(index)}}> ({type.problems === null ? 0 :type.problems.length}) Problem List </div>
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
        {state.isItemProblemModal &&
            <ItemProblem
                onClose={()=>{openModal()}}
                type_index={state.type_index}
                kit_type={state.selected_type} /> }
    </div>
)

KitItem.propTypes = {
    kitTypes: PropTypes.object,
    addKitType: PropTypes.func,
    onChangeAction: PropTypes.func,
    kitTypeEditAction: PropTypes.func,
    openModal: PropTypes.func,
    state: PropTypes.object
}

export default KitItem