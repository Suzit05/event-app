import React from 'react'
import "../styles/Home.css"
import home from "../assets/images/home.png"
import homemob from "../assets/images/homemob.png"
import cal1 from "../assets/images/cal1.png"
import cal2 from "../assets/images/cal2.png"
import audiomack from "../assets/images/audiomack.png"
import app2 from "../assets/images/app2.png"
import app3 from "../assets/images/app3.png"
import app4 from "../assets/images/app4.png"
import app5 from "../assets/images/app5.png"
import app6 from "../assets/images/app6.png"
import app7 from "../assets/images/app7.png"
import app8 from "../assets/images/app8.png"
import app9 from "../assets/images/app9.png"
import cnnctlogo from "../assets/images/cnnctlogo.png"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const handleSignup = () => {
        navigate("/Signup") //see the path , not the name of the pages
    }
    const handleLogin = () => {
        navigate("/Login")
    }
    return (
        <div className='outerContainer'>
            <div className='navbar'>
                <div><img src={cnnctlogo} alt="" /></div>
                <div><button onClick={handleSignup}>Sign up free</button></div>
            </div>
            <div className='container'>
                <div className='headingText'> <h1>CNNCT - Easy <br /> Scheduling ahead</h1>
                </div>
                <div className='signup-div'><button onClick={handleSignup}>Sign up free</button></div>
                <div className='img-div'><img src={home} alt="" /></div>
                <div className='img-div-mob'><img src={homemob} alt="" /></div>
            </div>
            <div className='container'>
                <div className='second-headingText'> <h3>Simplified scheduling for you and your team</h3>
                </div>
                <div className='second-headingText'><h5>CNNCT eliminates the back-and-forth of scheduling meetings so you can focus on what matters. Set your availability, share your link,<br /> and let others book time with you instantly.</h5></div>
                <div className='inner-second'>
                    <div className='list-text'>
                        <h3>Stay Organized with Your <br /> calender and meetings</h3>
                        <h4>Seamless Events Scheduling</h4>
                        <ul>
                            <li>View all your upcoming and meeting in one place</li>
                            <li>Syncs with Google Calender, outlook and iCloud to avoid Conflicts</li>
                            <li>Customize event types one on one , group meetings <br /> Sessions and Webinars.</li>

                        </ul>
                    </div>
                    <div className='second-img-div'>
                        <img src={cal1} alt="" />
                        <img src={cal2} alt="" />
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='third-top'>
                    <div className='third-top-left'>Heres what our Customer <br /> has to says</div>
                    <div className='third-top-right'><h6>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores tenetur reprehenderit porro obcaecati fugiat consequatur eaque, itaque accusamus debitis magni.</h6></div>
                </div>
                <div className='third-down'>
                    {/* First Row */}
                    <div className='first-row'>
                        <div className='first-box'>
                            <h3 >Amazing tool! Saved me months</h3>
                            <h5 >This is a placeholder for your testimonials and what your client has to  say, put them here and make sure its 100% true and meaningful</h5>
                            <div className='first-box-bottom' > <h4 className='round-blue'></h4> <div><h4 >John master</h4><h5 >Director, Spark.com</h5></div> </div>
                        </div>
                        <div className='first-box'>
                            <h3 >Amazing tool! Saved me months</h3>
                            <h5 >This is a placeholder for your testimonials and what your client has to  say, put them here and make sure its 100% true and meaningful</h5>
                            <div className='first-box-bottom' > <h4 className='round-blue'></h4> <div><h4 >John master</h4><h5 >Director, Spark.com</h5></div> </div>
                        </div>
                    </div>
                    {/* Second Row */}
                    <div className='first-row'>
                        <div className='first-box'>
                            <h3 >Amazing tool! Saved me months</h3>
                            <h5 >This is a placeholder for your testimonials and what your client has to  say, put them here and make sure its 100% true and meaningful</h5>
                            <div className='first-box-bottom' > <h4 className='round-blue'></h4> <div><h4 >John master</h4><h5 >Director, Spark.com</h5></div> </div>
                        </div>
                        <div className='first-box'>
                            <h3 >Amazing tool! Saved me months</h3>
                            <h5 >This is a placeholder for your testimonials and what your client has to  say, put them here and make sure its 100% true and meaningful</h5>
                            <div className='first-box-bottom' > <h4 className='round-blue'></h4> <div><h4 >John master</h4><h5 >Director, Spark.com</h5></div> </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='container'>
                <div className='app-heading'><h1>All Link Apps and Integrations</h1></div>
                <div className='apps-logo'>
                    <div className='apps-logo-row'>
                        <div className='apps-logo-box'>
                            <div><img src={audiomack} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Audiomack</h4>
                                <h5>Add an audiomack player to your link tree</h5>
                            </div>
                        </div>
                        <div className='apps-logo-box'>
                            <div><img src={app2} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Bandsintown</h4>
                                <h5>Drive ticket sales by listing your events</h5>
                            </div>
                        </div>
                        <div className='apps-logo-box'>
                            <div><img src={app3} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Bonfire</h4>
                                <h5>Display and sell your custom merch</h5>
                            </div>
                        </div>
                    </div>
                    <div className='apps-logo-row'>
                        <div className='apps-logo-box'>
                            <div><img src={app4} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Books</h4>
                                <h5>Promote books on your link tree</h5>
                            </div>
                        </div>
                        <div className='apps-logo-box'>
                            <div><img src={app5} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Buy me a gift</h4>
                                <h5>Let visitors support your little gift</h5>
                            </div>
                        </div>
                        <div className='apps-logo-box'>
                            <div><img src={app6} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Cameo</h4>
                                <h5>Make impossible fan connection reality</h5>
                            </div>
                        </div>
                    </div>
                    <div className='apps-logo-row'>
                        <div className='apps-logo-box'>
                            <div><img src={app7} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Clubhouse</h4>
                                <h5>Let your community is on the conversation</h5>
                            </div>
                        </div>
                        <div className='apps-logo-box'>
                            <div><img src={app8} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Community</h4>
                                <h5>Build an sms subscriber list</h5>
                            </div>
                        </div>
                        <div className='apps-logo-box'>
                            <div><img src={app9} alt="" /></div>
                            <div className='apps-logo-box-text'>
                                <h4>Contact Details</h4>
                                <h5>Easily sharable downloadable Contact details</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='about'>
                    <div className='about-top'>
                        <div>
                            <button onClick={handleLogin} className='login-btn'>login</button>
                            <button onClick={handleSignup} className='signup-btn'>signup free</button>
                        </div>


                        <div className='text-about'>
                            <h6>About connct</h6>
                            <h6>Blog</h6>
                            <h6>press </h6>
                            <h6>Blog</h6>
                            <h6>Contact </h6>
                        </div>
                        <div className='text-about'>
                            <h6>Carrers</h6>
                            <h6>Getting started</h6>
                            <h6>Features and how toes </h6>
                            <h6>FAQ</h6>
                            <h6>Report a validaton </h6>
                        </div>
                        <div className='text-about'>
                            <h6>Terms and Conditions</h6>
                            <h6>Privacy policy</h6>
                            <h6>Cookies notice </h6>
                            <h6>Trust Center</h6>

                        </div>
                    </div>
                    <div className='about-bottom'>
                        <div> <h5>We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri  <br /> people of the Kulin Nation, and pay our respects to Elders past, present and emerging.</h5></div>
                        {/* Social Media Icons */}
                        <div>
                            <i class="ri-twitter-fill"></i>
                            <i class="ri-instagram-fill"></i>
                            <i class="ri-youtube-fill"></i>
                            <i class="ri-tiktok-fill"></i>
                        </div>
                        {/*todo---niche about dekho fir home style karo */}
                    </div>
                </div>
            </div>
        </div>








    )
}

export default Home