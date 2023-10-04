import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './Contributors.css'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

import NavBar from "./NavBar"



const Contributors = () => {


    return(
        <div className="rootdiv">
        <NavBar/>

        {/* <div className='container grid-container'>
            <div className='row'>
                <div className='col contributor-tile'>
                    Aman Khandelwal
                    <br/>
                    2022201010
                </div>
                <button className='col btn btn-outline-success contributor-tile' type="button">
                    Arun Das
                    <br/>
                    2022201021
                </button>
                <button className='col btn btn-outline-success contributor-tile' type="button">
                    Nikhil Chawla
                    <br/>
                    2022201045
                </button>
                
            </div>
            <div className='row'>
                <button className='col btn btn-outline-success contributor-tile' type="button">
                    Nikhil Khemchandani
                    <br/>
                    2022201042
                </button>
                <button className='col btn btn-outline-success contributor-tile' type="button">
                    Divyansh Negi
                    <br/>
                    2022201014
                </button>
                <button className='col btn btn-outline-success contributor-tile' type="button">
                    Piyush Singh
                    <br/>
                    2022201032
                </button>
                
            </div>
        </div> */}




        <table className='contributor-table'>

            <tr>
                <td className='col contributor-tile'>
                    Aman Khandelwal
                    <br/>
                    2022201010
                </td>
                <td className='col contributor-tile'>
                    Arun Das
                    <br/>
                    2022201021
                </td>
                <td className='col contributor-tile'>
                    Nikhil Chawla
                    <br/>
                    2022201045
                </td>
            </tr>

            <tr>
                <td className='col contributor-tile'>
                    Nikhil Khemchandani
                    <br/>
                    2022201042
                </td>
                <td className='col contributor-tile'>
                    Divyansh Negi
                    <br/>
                    2022201014
                </td>
                <td className='col contributor-tile'>
                    Piyush Singh
                    <br/>
                    2022201032
                </td>
            </tr>
        </table>

        </div> 
    );
}

export default Contributors;