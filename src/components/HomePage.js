import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './HomePage.css'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const HomePage = () => {

    const navigate = useNavigate();

    const navigateToBasicDetails = () => {
        navigate('/basic-details');
    }

    const navigateToCO2Emissions = () => {
        navigate('/co2-emissions');
    }

    const navigateToContributors = () => {
        navigate('/contributors');
    }

    return(
        <div className='d-flex align-items-center justify-content-center bgimg'>


            <div>
            <h1 className='project-name'>
                PROJECT NAME
            </h1>
            <hr className='hr-line'/>
            <div className='container'>
                <div className='row'>
                    <button className='col btn btn-outline-success my-button' type="button" onClick={ () => { navigateToBasicDetails(); }}>Basic Details</button>

                    
                </div>
                <div className='row'>
                    <button className='col btn btn-outline-success my-button' type="button" onClick={ () => { navigateToCO2Emissions(); } }>GHG Emissions</button>

                    
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