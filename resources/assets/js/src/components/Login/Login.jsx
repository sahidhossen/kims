import React from 'react'
import PropTypes from 'prop-types'

export const Login = ({ login,state, onFieldChange, oauth }) => (
    <div className="content loginFormHolder">
        <div className="mask-backaground"></div>
        <div className="row loginPage">
            <div className="content">
                <div className="login-mask"></div>
                <div className="card">
                    <div className="card-header header-elements-inline">
                    </div>
                    <div className="card-body">
                        
                        <h1 className="text-center form-title"> Login </h1>
                        { oauth.error !== null && <p className="alert alert-danger" role="alert"> Invalid credential </p>}
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="text" className="form-control" name="secret_id" value={state.screct_id} onChange={(e)=>{onFieldChange(e)}} placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" className="form-control" name="password" value={state.password} placeholder="Password" onChange={(e)=>{onFieldChange(e)}} />
                        </div>
                        <button type="submit" className="btn btn-orange pull-right" onClick={(e) => login(e)}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

Login.propTypes = {
    login: PropTypes.func,
    onFieldChange: PropTypes.func,
    state: PropTypes.object,
    oauth: PropTypes.object
}


export default Login