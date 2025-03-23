import React, { useState } from 'react';
import "../styles/CreateEvent.css";
import Menu from '../Components/Menu';
import cnnctlogo from "../assets/images/cnnctlogo.png";
import Events from './Events';


const CreateEvent = () => {


    return (
        <div className='dashboard-outside-container'>
            <div className='menu-container'>
                <Menu />
            </div>
            <div className='screen-container'>
                <Events></Events>
            </div>
        </div>
    );
};

export default CreateEvent;
