import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './HomePage.css'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'


const HomePage = () => {

    const navigate = useNavigate();

    const navigateToBasicDetails = () => {
        navigate('/basic-details');
    }

    const navigateToGHGEmissions = () => {
        navigate('/ghg-emissions');
    }

    const navigateToPredictionPage = () => {
        navigate('/predict');
    }

    const navigateToContributors = () => {
        navigate('/contributors');
    }

    return(
        <div className='d-flex align-items-center justify-content-center bgimg'>


            <div>
            <h1 className='project-name'>
                GREEN WITH GUSTO
            </h1>
            <h5 className='sub-heading'>
                An Environmental Analysis on the African Subcontinent
            </h5>
            <hr className='hr-line'/>
            <div className='container'>
                <div className='row'>
                    <button className='col btn btn-outline-success my-button' type="button" onClick={ () => { navigateToBasicDetails(); }}>Basic Details</button>
                </div>

                <div className='row'>
                    <button className='col btn btn-outline-success my-button' type="button" onClick={ () => { navigateToGHGEmissions(); } }>GHG Emissions</button>
                </div>

                <div className='row'>
                    <button className='col btn btn-outline-success my-button' type="button" onClick={ () => { navigateToPredictionPage(); } }>Predict CO2 Emission</button>
                </div>

                <div className='row'>
                    <button className='col btn btn-outline-success my-button' type="button" onClick={ () => { navigateToContributors(); } }>Contributors</button>                    
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default HomePage;