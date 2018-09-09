import React from 'react'

export const DefaultDashboard = () => (
    <div className="content">
        <div className="row m-0">
            <div className="col-6">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-users"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Formation </p>
                        <h3 className="token-title"> 2 </h3>
                    </div>
                </div>
            </div>
            <div className="col-5 offset-1">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-list-unordered"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Units </p>
                        <h3 className="token-title"> 2 </h3>
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
                        <p className="token-sub-title"> Total Soldiers </p>
                        <h3 className="token-title"> 300 </h3>
                    </div>
                </div>
            </div>
            <div className="col-5 offset-1">
                <div className="token-box row align-items-center bg-red-light">
                    <div className="token-front  text-center">
                        <span><i className="icon-list-unordered"></i></span>
                    </div>
                    <div className="token-data flex-1 align-items-center bg-white">
                        <p className="token-sub-title"> Total Kit Items </p>
                        <h3 className="token-title"> 1200 </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

)


export default DefaultDashboard