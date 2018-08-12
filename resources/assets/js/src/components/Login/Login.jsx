import React from 'react'
import PropTypes from 'prop-types'

export const Login = ({ login }) => (
    <div className="content">
        <div className="row loginPage">
            <div className="content">
                <div className="card">
                    <div className="card-header header-elements-inline">
                    </div>
                    <div className="card-body">
                        <h1 className="text-center"> Login Panel </h1>
                        <p className="note text-center"> (Now we use default login system for development purpose) </p>
                        <a className="login_url" href="#" onClick={(e)=> login(e)}> Login </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

Login.propTypes = {
    login: PropTypes.func
}


export default Login