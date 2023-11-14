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

        <table className='contributor-table'>

            <tr>
                <td className='col contributor-tile'>
                    Aman Khandelwal
                    <br/>
                    2022201010
                    <table className='social-table'>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/linkedin.png')}/> </td>
                            <td className='social-cell'> <label> <a className='social-link' href='https://www.linkedin.com/in/aman-khandelwal-01a50612a/'>Linkedin</a></label> </td>
                        </tr>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/github.png')}/> </td>
                            <td className='social-cell'> <label><a className='social-link' href='https://github.com/wolfblunt'>Github</a></label> </td>
                        </tr>
                    </table>

                </td>
                <td className='col contributor-tile'>
                    Arun Das
                    <br/>
                    2022201021
                    <table className='social-table'>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/linkedin.png')}/> </td>
                            <td className='social-cell'> <label> <a className='social-link' href='https://www.linkedin.com/in/arun-das-22193b178/'>Linkedin</a></label> </td>
                        </tr>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/github.png')}/> </td>
                            <td className='social-cell'> <label><a className='social-link' href='https://github.com/qazz625'>Github</a></label> </td>
                        </tr>
                    </table>
                </td>
                <td className='col contributor-tile'>
                    Nikhil Chawla
                    <br/>
                    2022201045
                    <table className='social-table'>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/linkedin.png')}/> </td>
                            <td className='social-cell'> <label> <a className='social-link' href='https://www.linkedin.com/in/-nikhil-chawla-/'>Linkedin</a></label> </td>
                        </tr>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/github.png')}/> </td>
                            <td className='social-cell'> <label><a className='social-link' href='https://github.com/nikhil981228'>Github</a></label> </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <tr>
                <td className='col contributor-tile'>
                    Nikhil Khemchandani
                    <br/>
                    2022201042
                    <table className='social-table'>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/linkedin.png')}/> </td>
                            <td className='social-cell'> <label> <a className='social-link' href='https://www.linkedin.com/in/nikhil-khemchandani'>Linkedin</a></label> </td>
                        </tr>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/github.png')}/> </td>
                            <td className='social-cell'> <label><a className='social-link' href='https://github.com/Nikhil5555'>Github</a></label> </td>
                        </tr>
                    </table>
                </td>
                <td className='col contributor-tile'>
                    Divyansh Negi
                    <br/>
                    2022201014
                    <table className='social-table'>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/linkedin.png')}/> </td>
                            <td className='social-cell'> <label> <a className='social-link' href='https://www.linkedin.com/in/divyansh-negi-a8414220b/'>Linkedin</a></label> </td>
                        </tr>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/github.png')}/> </td>
                            <td className='social-cell'> <label><a className='social-link' href='https://github.com/Divyansh6788'>Github</a></label> </td>
                        </tr>
                    </table>
                </td>
                <td className='col contributor-tile'>
                    Piyush Singh
                    <br/>
                    2022201032
                    <table className='social-table'>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/linkedin.png')}/> </td>
                            <td className='social-cell'> <label> <a className='social-link' href='https://www.linkedin.com/in/piyush-singh-130178235/'>Linkedin</a></label> </td>
                        </tr>
                        <tr className='social-cell'>
                            <td className='social-cell'> <img className='social' src={require('../resources/github.png')}/> </td>
                            <td className='social-cell'> <label><a className='social-link' href='https://github.com/poyushsingh'>Github</a></label> </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        </div> 
    );
}

export default Contributors;