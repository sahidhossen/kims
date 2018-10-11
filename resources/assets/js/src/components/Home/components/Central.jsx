/**
 * Created by sahidhossen on 11/10/18.
 */
import React from 'react'
import PropTypes from 'prop-types'
export const Central = ({kitControllers}) => (
    <div className="content">
        <div className="row m-0">
            <div className="col-6">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-users"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Formation </p>
                        <h3 className="token-title"> {kitControllers.formation_offices.length} </h3>
                    </div>
                </div>
            </div>
            <div className="col-5 offset-1">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-list-unordered"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Quarters </p>
                        <h3 className="token-title"> {kitControllers.quarters.length} </h3>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div className="row m-0">
            <div className="col-6">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-users"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Units </p>
                        <h3 className="token-title"> {kitControllers.units.length} </h3>
                    </div>
                </div>
            </div>
            <div className="col-5 offset-1">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-list-unordered"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Company </p>
                        <h3 className="token-title"> {kitControllers.companies.length} </h3>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div className="row m-0">
            <div className="col-6">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-list-unordered"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Total Kit Items </p>
                        <h3 className="token-title"> {kitControllers.items} </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

Central.propTypes = {
    kitControllers: PropTypes.object
}

export default Central