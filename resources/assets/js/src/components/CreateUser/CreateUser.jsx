import React from 'react'

export const User = () => (
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
                           <h5 className="card-title">Add User</h5>
                       </div>
                       <div className="card-body">
                           <p> Form body  </p>
                       </div>
                   </div>
               </div>
            </div>
        </div>
    </div>
)

export default User