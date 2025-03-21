import React from 'react'
import "../styles/Signup.css"
import rightLogin from "../assets/images/rightLogin.png"
import cnnctlogo from "../assets/images/cnnctlogo.png"

const Signup = () => {
    return (
        //sign up pr kaam kro, and classname should be unique everywhere
        <div className='signup-outer-container'>
            <div className='left-container'>
                <div className='logo-container'>
                    <img src={cnnctlogo} alt="" />
                </div>
                <div className='form-container'>
                    <div className='heading'>
                        <h1>Create an Account</h1>
                        <h3>Sign in instead</h3>
                    </div>

                    <div className='input-div'>
                        <input type="text" placeholder='First Name' />
                        <input type="text" placeholder='Last Name' />
                        <input type="text" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <input type="password" placeholder='Confirm Password' />
                        {/* Terms Checkbox */}
                        <label className="terms-label">
                            <input type="checkbox" required />
                            By creating an account, I agree to the <span className="terms-link">Terms of Use</span> and <span className="terms-link">Privacy Policy</span>
                        </label>

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

export default Signup