import React from 'react'
import "../styles/Login.css"
import rightLogin from "../assets/images/rightLogin.png"
import cnnctlogo from "../assets/images/cnnctlogo.png"

const Login = () => {
    return (
        <div className='outer-container'>
            <div className='left-container'>
                <div className='logo-container'>
                    <img src={cnnctlogo} alt="" />
                </div>
                <div className='form-container'>
                    <h1>Sign in</h1>
                    <div className='input-div'>
                        <input type="text" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                    </div>
                    <button>Login</button>

                    <p>Don't have an account? <span className='signup-link'> Sign up</span></p>
                </div>
            </div>
            <div className='right-container'>
                <img src={rightLogin} alt="" />
            </div>
        </div>
    )
}

export default Login