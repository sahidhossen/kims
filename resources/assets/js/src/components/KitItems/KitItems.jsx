import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';

export const KitItem = ({
    kitItems,
    addItem,
    onChangeAction,
    state
}) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Kit Item</span> - List</h4>
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
                            <h3> Add Kit Item </h3>
                        </div>
                        <div className="card-body">
                            { state.error !== '' && <p className="alert-danger"> {state.error}</p> }
                            <div className="d-flex flex-row">
                                <div className="flex-1 box-1">
                                    <Select
                                        value={state.kitSelectOption}
                                        onChange={(value)=>{ onChangeAction(value, "kit_type_id") }}
                                        options={state.itemKitTypeOptions}
                                    />
                                </div>
                                <div className="flex-1 box-1 px-3">
                                    <Select
                                        value={state.centralOfficeSelectedOption }
                                        onChange={(value)=>{ onChangeAction(value, "central_office_id") }}
                                        options={state.centralOfficeOptions}
                                    />
                                </div>
                                <div className="action-box">
                                    <div className="btn btn-info" onClick={(e)=> { addItem(e)}}> Add Item </div>
                                </div>
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
                            <h3> Kit Item List </h3>
                        </div>
                        <div className="card-body">
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
                                { kitItems.kitItems.length > 0 && kitItems.kitItems.map( (item, index) => (
                                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                        <div className="flex-row d-flex align-items-center">
                                            <div className="flex-1">
                                                {item.kit_name}
                                            </div>
                                            <div className="flex-1">
                                                {item.central_office_name}
                                            </div>
                                            <div className="operation-area">
                                                {/*<div className="btn btn-info" onClick={(e)=> {kitTypeEditAction(e, index)}}> Edit </div>*/}
                                                {/*&nbsp;*/}
                                                {/*<div className="btn btn-danger" onClick={(e)=> {userDeleteAction(e, index)}}> Delete </div>*/}
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
    </div>
)

KitItem.propTypes = {
    kitItems: PropTypes.object,
    addItem: PropTypes.func,
    onChangeAction: PropTypes.func,
    state: PropTypes.object
}

export default KitItem