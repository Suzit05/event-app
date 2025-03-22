import React from 'react'
import "../styles/Dashboard.css"
import Menu from '../Components/Menu'
import cnnctlogo from "../assets/images/cnnctlogo.png"
import Events from './Events'
import Events2 from './Events2'

const Dashboard = () => {
    return (
        <div className='dashboard-outside-container'>
            <div className='menu-container'>
                <Menu></Menu>
            </div>
            <div className='screen-container'>
                <Events></Events>
                {/* <Events2></Events2> */}
            </div>
        </div>
    )
}

export default Dashboard