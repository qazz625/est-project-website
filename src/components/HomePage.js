import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './HomePage.css'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    const navigateToBasicDetails = () => {
        navigate('/basic-details');
    }

    const navigateToCO2Emissions = () => {
        navigate('/co2-emissions');
    }

    return(
        <div>
            Hello World
            <br/>
            <button onClick={
                () => { navigateToBasicDetails(); }
            }> Basic Details </button>
            <br/>
            <button onClick={
                () => { navigateToCO2Emissions(); }
            }> CO2 Emissions </button>
        </div>
    );
}

export default HomePage;