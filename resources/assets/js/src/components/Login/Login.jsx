import React from 'react'
import PropTypes from 'prop-types'

export const Login = ({ login }) => (
    <div className="LoginPage">
        <div className="Loginform">
            <h1> This is login page </h1>
            <a href="#" onClick={(e)=> login(e)}> Login </a>
        </div>
    </div>
)

Login.propTypes = {
    login: PropTypes.func
}


export default Login