import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { COMPANY_USERS } from '../../../constants'
export const Company = ({users}) => (
    <div className="content">
        <div className="row m-0">
            <div className="col-6">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-users"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Total Soldiers </p>
                        <h3 className="token-title"> {users.length} </h3>
                    </div>
                </div>
            </div>
            <div className="col-5 offset-1">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-list-unordered"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Total Items </p>
                        <h3 className="token-title"> 400 </h3>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="content">
                <div className="card kit-box-shadow">
                    <div className="card-header bg-red-light row m-0">
                        <div className="col">
                            <h3 className="card-title"> Soldier List </h3>
                        </div>
                        <div className="cal-2 text-right">
                            <Link to={COMPANY_USERS} className="btn btn-success btn-lg pull-right"> View All </Link>
                        </div>
                    </div>
                    <div className="d-flex flex-column bg-light border rounded p-2">
                        <div className="bg-slate py-2 px-3 rounded-top  border-top-1 ">
                            <div className="flex-row d-flex align-items-center">
                                <div className="flex-1">
                                    <strong> Soldier Name </strong>
                                </div>
                                <div className="flex-1">
                                    <strong> Secret ID </strong>
                                </div>
                                <div className="action">
                                    <strong> Action </strong>
                                </div>
                            </div>
                        </div>
                        { users.length > 0 && users.slice(0,3).map((user, index) => (
                                <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                                    <div className="flex-row d-flex align-items-center">
                                        <div className="flex-1">
                                            {user.name}
                                        </div>
                                        <div className="flex-1 px-1">
                                            {user.secret_id}
                                        </div>
                                        <div className="operation-area">
                                            <Link className="btn btn-info" to={`/dashboard/user/${user.id}`}>
                                                Details </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>

)

Company.propTypes = {
    users: PropTypes.array
}

export default Company