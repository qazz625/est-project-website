import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './Predict.css'
import { useNavigate } from 'react-router-dom';
import { CompoasableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, ComposableMap } from "react-simple-maps";
import { scaleLinear } from "d3-scale"
import 'bootstrap/dist/css/bootstrap.css'
import CanvasJSReact from '@canvasjs/react-charts';

import newsDummyResponse from "../dummy_responses/news.json"
import countryYearDummyResponse from "../dummy_responses/country_year_ghg.json"

import COUNTRIES from "../resources/countries.json"
import YEARS from "../resources/years.json"


import geoUrl from "./map.json"

import NavBar from "./NavBar"

import { Tooltip } from 'react-tooltip'




var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const NEWS_ENDPOINT_PREFIX = "http://192.168.97.116:9823/africaCountryGeoStats?country=";
const USE_DUMMY_API = 1;
const DUMMY_TARGET = 'https://jsonplaceholder.typicode.com/todos/1';

const Predict = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [news, setNews] = useState([]);
    const [position, setPosition] = useState({center:[20, 0], zoom:1})


   
    function selectCountry(countryName){
        setSelectedCountry(countryName);
        console.log(countryName);
        document.getElementById("country-dropdown").value = countryName;
        if(countryName == ""){
            return;
        }


        if(USE_DUMMY_API == 0){
            var target_url1 = NEWS_ENDPOINT_PREFIX + countryName;
            var target_url2 = '';
        }
        else{
            var target_url1 = DUMMY_TARGET;
            var target_url2 = DUMMY_TARGET;
        }
        

        // var target_url1 = "http://10.1.37.102:9823/africaCountryAllYearGHGStat?country=" + countryName;
        // var target_url2 = "http://10.1.37.102:9823/africaCountryEnergyStats?country=" + countryName + "&" + "year=" + selectedYear;

        // var target_url1 = "http://192.168.97.116:9823/africaCountryAllYearGHGStat?country=" + countryName;
        // var target_url2 = "http://192.168.97.116:9823/africaCountryEnergyStats?country=" + countryName + "&" + "year=" + selectedYear;


        fetch(target_url1)
        .then(response => response.json())
        .then((json) => {
            if(USE_DUMMY_API == 0){
                setNews(json.environmentNews);
            }
            else{
                setNews(newsDummyResponse.environmentNews);
            }
        })

        console.log("GG");
        console.log(news);
    
        if(selectedYear != ""){
            // fetch(target_url2)
            // .then(response => response.json())
            // .then((json) => {
                
            // })
        }
        
        
    }


    function selectYear(e){
        setSelectedYear(e.target.value);
        if(selectedCountry == "" || e.target.value == ""){
            return;
        }


        var target_url1 = 'https://jsonplaceholder.typicode.com/todos/1';
        var target_url2 = 'https://jsonplaceholder.typicode.com/todos/1';

        // var target_url1 = "http://10.1.37.102:9823/africaCountryEnergyStats?country=" + selectedCountry + "&" + "year=" + e.target.value;
        // var target_url2 = "http://10.1.37.102:9823/africaCountryAllYearGHGStat?country=" + selectedCountry;

        // var target_url1 = "http://192.168.97.116:9823/africaCountryEnergyStats?country=" + selectedCountry + "&" + "year=" + e.target.value;
        // var target_url2 = "http://192.168.97.116:9823/africaCountryAllYearGHGStat?country=" + selectedCountry;

        fetch(target_url1)
            .then(response => response.json())
            .then((json) => {

            })

        // if(Object.keys(lineChartOptions).length === 0){
        //     fetch(target_url2)
        //     .then(response => response.json())
        //     .then((json) => {

        //     })
        // }
    }

    
    return(
        <div className="rootdiv">
            <NavBar/>

        <div className="container">
            <div className='row topdiv'>
            <div className='col leftdiv'>
                <table>
                    <tr>
                        <td className='select-cell'>
                            Country:
                        </td>
                        <td className='select-cell'>
                            <select id="country-dropdown" className="dropdown" defaultValue="" onChange={(e) => selectCountry(e.target.value)}>
                                <option value="" disabled>Select the country</option>
                                {COUNTRIES.map(function(object, i){ return(<option value={object} key={i} > {object} </option>);})}
                            </select>
                        </td>
                    </tr>
                    

                    <tr>
                        <td className='select-cell'>
                            Year:
                        </td>
                        <td className='select-cell'>
                            <select className="dropdown" defaultValue="" onChange={(e) => selectYear(e)}>
                                <option value="" disabled>Select the year</option>
                                {YEARS.map(function(object, i){ return(<option value={object} key={i}> {object} </option>);})}
                            </select>
                        </td>

                    </tr>



                </table>

                
            </div>

            <div className='col mapdiv'>
            <ComposableMap
                width={400}
                height={450}
                projectionConfig={{
                    center: position.center,
                    scale: 280
                }}>
                {
                    COUNTRIES.length > 0
                    ?
                        <ZoomableGroup
                           zoom={position.zoom} 
                           center={position.center}
                           maxZoom={2}
                           translateExtent={[
                            [0, 0],
                            [400, 450]
                          ]}
                           >
                            <Geographies geography={geoUrl} stroke="#000000">
                                {({geographies}) =>
                                    geographies.map((geo, index) => {
                                        const selected = geo.properties.name_long === selectedCountry
                                        return(
                                            <Geography 
                                                key={index}
                                                geography={geo}
                                                fill={"#d9dbde"}
                                                style={{hover: {
                                                    fill: "#FF6F61",
                                                    stroke: "#9E1030",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                    transition: "all 250ms"
                                                        }}}
                                                data-tooltip-id="my-tooltip"
                                                data-tooltip-content={geo.properties.name_long}
                                                data-tooltip-place="top"
                                                onClick={() => selectCountry(geo.properties.name_long)}
                                            />
                                        )
                                    })

                                }
                            </Geographies>
                         </ZoomableGroup>
                    :
                    <p>"LOADING"</p>
                }

            </ComposableMap>
            </div>
        </div>

        

        {selectedCountry != '' && 
            <div className='row topdiv'>
                <div className='col newsdiv'>
                    <div className='news-section-heading'>
                        Environmental News for {selectedCountry}
                    </div>

                    {news.map(function(object, i){
                        return (
                            <div>
                                <div className='news-article'>
                                    <div className='news-title'>
                                        <a href={object.link}>{object.title}</a>
                                    </div>
                                    <div className='news-desc'>
                                        {object.description}
                                    </div>
                                    <div className='news-source'>
                                        by {object.source}
                                    </div>
                                </div>
                                <br/>
                            </div>
                        )
                    })}
                </div>
            </div>
        }

        </div>


        <Tooltip id="my-tooltip" />
        </div>
    );
}

export default Predict;