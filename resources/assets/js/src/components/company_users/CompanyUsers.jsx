import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export const CompanyUsers = ({state, onSoldierSearch, users}) => (
    <div className="content">

        <div className="row">
            <div className="content search-box-container">
                <div className="search-box">
                    <input type="text" value={state.searchTxt} onChange={(e)=>{onSoldierSearch(e)}} className="form-control" placeholder="Search Soldier" />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="content">
                <div className="card kit-box-shadow">
                <div className="card-header bg-red-light">
                    <h3 className="card-title"> Soldier List </h3>
                    <span className="token-label token-white"> { users.users.length} </span>
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
                    { state.switchToSearch === true ? state.searchResult.map((user, index) => (
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
                            )) :
                        users.users.length > 0 && users.users.map((user, index) => (
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

CompanyUsers.propTypes = {
    onSoldierSearch: PropTypes.func,
    state: PropTypes.object,
    users: PropTypes.object
}


export default CompanyUsers