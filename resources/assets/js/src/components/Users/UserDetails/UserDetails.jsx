import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'
import moment from 'moment'

export const UserDetails = ({
    users,
    onChangeAction,
    assignItem,
    state
}) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">User</span> - Details</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="row">
                <div className="content">
                    <div className="card">
                        <div className="card-header header-elements-inline">
                            <h1> User : { users.user !== null &&  users.user.name } </h1>
                            { users.error !== null && <p className="alert-danger"> { users.error}</p> }
                        </div>
                        <div className="card-body">
                            <hr/>
                            <h3> Assign Kit Items  </h3>
                            { state.error !== '' && <p className="alert-danger"> {state.error}</p> }
                            <div className="d-flex flex-row">
                                <div className="flex-1 box-1">
                                    <Select
                                        value={state.kitSelectOption}
                                        onChange={(value)=>{ onChangeAction(value, "kit_type_id") }}
                                        options={state.kitTypeOptions}
                                    />
                                </div>
                                <div className="flex-1 box-1 px-3">
                                    <Select
                                        value={state.kitItemSelection }
                                        onChange={(value)=>{ onChangeAction(value, "kit_item_id") }}
                                        options={state.kitItemOptions}
                                    />
                                </div>
                                <div className="action-box">
                                    <div className="btn btn-info" onClick={(e)=> { assignItem(e)}}> Add Item </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <div className="issue-date-box">
                                    Issue Date
                                </div>
                                <div className="flex-1 box-1">

                                    <DatePicker
                                        className="form-control"
                                        selected={state.assignItem.issue_date}
                                        onChange={(date)=>{onChangeAction(date, "issue_date")}}
                                    />
                                </div>
                                <div className="issue-date-box offset-1">
                                    Expire Date
                                </div>
                                <div className="flex-1 box-1">
                                    <DatePicker
                                        className="form-control"
                                        selected={state.assignItem.expire_date}
                                        onChange={(date)=>{onChangeAction(date, "expire_date")}}
                                    />
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
                            <h1> Assigned Kits List  </h1>
                        </div>
                        <div className="card-body">
                            <hr/>
                            <h3> Assign Kit Items  </h3>
                            <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                                <div className="flex-row d-flex align-items-center">
                                    <div className="sr">
                                        <strong>S.L. &nbsp;  &nbsp;</strong>
                                    </div>
                                    {/*<div className="flex-1">*/}
                                        {/*<strong> Central Office</strong>*/}
                                    {/*</div>*/}
                                    <div className="flex-1">
                                        <strong> District Office</strong>
                                    </div>
                                    <div className="flex-1">
                                        <strong> Unit</strong>
                                    </div>
                                    <div className="flex-1">
                                        <strong>Company</strong>
                                    </div>
                                    <div className="flex-1">
                                        <strong>Item Name</strong>
                                    </div>
                                    <div className="flex-1">
                                        <strong>Issue Date</strong>
                                    </div>
                                    <div className="flex-1">
                                        <strong>Expire Date</strong>
                                    </div>
                                </div>
                            </div>
                            { users.currentItems.length > 0 && users.currentItems.map( (user, index) => (
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="sr">
                                            { index+1 }  &nbsp;  &nbsp;
                                        </div>
                                        {/*<div className="flex-1">*/}
                                            {/*{user.central_name}*/}
                                        {/*</div>*/}
                                        <div className="flex-1">
                                            {user.district_name}
                                        </div>
                                        <div className="flex-1">
                                            {user.unit_name}
                                        </div>
                                        <div className="flex-1">
                                            {user.company_name}
                                        </div>
                                        <div className="flex-1">
                                            {user.item_name}
                                        </div>
                                        <div className="flex-1">
                                            { moment(user.issue_date).format('YYYY-MM-DD') }
                                        </div>
                                        <div className="flex-1">
                                            { moment(user.expire_date).format('YYYY-MM-DD') }
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
)

UserDetails.propTypes = {
    users: PropTypes.object,
    state: PropTypes.object,
    onChangeAction: PropTypes.func,
    assignItem: PropTypes.func
}

export default UserDetails