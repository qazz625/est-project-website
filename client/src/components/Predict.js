import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './Predict.css'
import { useNavigate } from 'react-router-dom';
import { CompoasableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, ComposableMap } from "react-simple-maps";
import { scaleLinear } from "d3-scale"
import 'bootstrap/dist/css/bootstrap.css'
import CanvasJSReact from '@canvasjs/react-charts';

import predictDummyResponse from "../dummy_responses/predict.json"
import newsDummyResponse from "../dummy_responses/news.json"

import COUNTRIES_PREDICT from "../resources/countries_predict.json"
import YEARS_PREDICT from "../resources/years_predict.json"
import endpoint_base from "../resources/endpoint_base.json"


import geoUrl from "./map.json"

import NavBar from "./NavBar"

import { Tooltip } from 'react-tooltip'




var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const NEWS_ENDPOINT_PREFIX = endpoint_base.ENDPOINT_BASE + "africaCountryEnvironmentNews?country=";
const SIMPLE_PREDICT_PREFIX = endpoint_base.ENDPOINT_BASE + "africaCountryCO2Prediction?country=";
const ADVANCED_PREDICT_PREFIX = endpoint_base.ENDPOINT_BASE + "africaCountryAdvanceCO2Prediction?country=";
const USE_DUMMY_API = 1;
const DUMMY_TARGET = 'https://jsonplaceholder.typicode.com/todos/1';

const Predict = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [news, setNews] = useState([]);
    const [position, setPosition] = useState({center:[20, 0], zoom:1})
    const [advanced, setAdvanced] = useState(false);
    const [biowaste, setBiowaste] = useState(-1);
    const [coal, setCoal] = useState(-1);
    const [oil, setOil] = useState(-1);
    const [naturalGas, setNaturalGas] = useState(-1);
    const [errorMessage, setErrorMessage] = useState('');
    const [predictionValue, setPredictionValue] = useState({});


    function predict(){
        setPredictionValue({});
        if(selectedCountry == "" || selectedYear == ""){
            setErrorMessage("Please select the country and the year");
            return;
        }

        if(!advanced){
            setErrorMessage('');

            var target_url;
            if(USE_DUMMY_API == 0){
                target_url = SIMPLE_PREDICT_PREFIX + selectedCountry + '&year=' + selectedYear;
            }
            else{
                target_url = DUMMY_TARGET;
            }
    
            fetch(target_url)
            .then(response => response.json())
            .then((json) => {
                if(USE_DUMMY_API == 0){
                    setPredictionValue(json);
                }
                else{
                    setPredictionValue(predictDummyResponse);
                }
            })
        }

        else{
            if(biowaste < 0 || coal < 0 || oil < 0 || naturalGas < 0){
                setErrorMessage("Please enter proper values for all the fields");
                return;
            }
            if(biowaste == '' || coal == '' || oil == '' || naturalGas == ''){
                setErrorMessage("Please enter proper values for all the fields");
                return;
            }

            setErrorMessage('');

            console.log(biowaste);
            console.log(coal);
            console.log(oil);
            console.log(naturalGas);

            var target_url;
            if(USE_DUMMY_API == 0){
                target_url = ADVANCED_PREDICT_PREFIX + selectedCountry + '&year=' + selectedYear + '&biofuel=' + biowaste + '&coal_peat=' + coal + '&oil=' + oil + '&natural_gas=' + naturalGas;
            }
            else{
                target_url = DUMMY_TARGET;
            }

            console.log(target_url);
    
            fetch(target_url)
            .then(response => response.json())
            .then((json) => {
                if(USE_DUMMY_API == 0){
                    setPredictionValue(json);
                }
                else{
                    setPredictionValue(predictDummyResponse);
                }
            })
        }        
    }
   
    function selectCountry(countryName){
        setPredictionValue({});
        setSelectedCountry(countryName);
        console.log(countryName);
        document.getElementById("country-dropdown").value = countryName;

        var target_url;
        if(USE_DUMMY_API == 0){
            target_url = NEWS_ENDPOINT_PREFIX + countryName;
        }
        else{
            target_url = DUMMY_TARGET;
        }
        
        fetch(target_url)
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            if(USE_DUMMY_API == 0){
                setNews(json.environmentNews);
            }
            else{
                setNews(newsDummyResponse.environmentNews);
            }
        })

        console.log(news);
    }

    function advancedToggle(checked){
        setAdvanced(checked);
        setBiowaste(-1);
        setCoal(-1);
        setOil(-1);
        setNaturalGas(-1);
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
                                {COUNTRIES_PREDICT.map(function(object, i){ return(<option value={object} key={i} > {object} </option>);})}
                            </select>
                        </td>
                    </tr>
                    

                    <tr>
                        <td className='select-cell'>
                            Year:
                        </td>
                        <td className='select-cell'>
                            <select className="dropdown" defaultValue="" onChange={(e) => setSelectedYear(e.target.value)}>
                                <option value="" disabled>Select the year</option>
                                {YEARS_PREDICT.map(function(object, i){ return(<option value={object} key={i}> {object} </option>);})}
                            </select>
                        </td>

                    </tr>
                </table>

                    <input className='check-box' type="checkbox" id="advanced" name="advanced" onChange={(e) => {advancedToggle(e.target.checked);}}/>
                    <label className='check-box-label'> Advanced </label><br/>
                
                { advanced &&
                    <table>
                        <tr>
                            <td className='select-cell'>
                                Energy by Biofuels and Waste (tCO2/TJ):
                            </td>
                            <td className='select-cell'>
                                <input className='num-input' type="number" min={0} onChange={(e) => setBiowaste(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='select-cell'>
                                Energy by Coal, Peat and Oil Shale (tCO2/TJ):
                            </td>
                            <td className='select-cell'>
                                <input className='num-input' type="number" min={0} onChange={(e) => setCoal(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='select-cell'>
                                Energy by Oil (tCO2/TJ):
                            </td>
                            <td className='select-cell'>
                                <input className='num-input' type="number" min={0} onChange={(e) => setOil(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className='select-cell'>
                                Energy by Natural Gas (tCO2/TJ):
                            </td>
                            <td className='select-cell'>
                                <input className='num-input' type="number" min={0} onChange={(e) => setNaturalGas(e.target.value)}/>
                            </td>
                        </tr>
                    </table>
                }
                
                <button className='predict-button' type="button" onClick={() => {predict();}}> Predict </button>

                {errorMessage != '' && <div className='error-message'> {errorMessage} </div> }
                {Object.keys(predictionValue).length != 0 &&
                    <div className='prediction-result'>
                        Predicted CO2 emission for {selectedCountry} in {selectedYear} = {predictionValue.totalCO2Emission} {predictionValue.unit} ({predictionValue.threat_level} threat)
                    </div>
                }

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
                    COUNTRIES_PREDICT.length > 0
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
                                        var threat_color = "#d9dbde";
                                        if(Object.keys(predictionValue).length != 0){
                                            if(predictionValue.threat_level == 'low'){
                                                threat_color = "#ffcccc"
                                            }
                                            if(predictionValue.threat_level == 'moderate'){
                                                threat_color = "#ff8080"
                                            }
                                            if(predictionValue.threat_level == 'high'){
                                                threat_color = "#ff0000"
                                            }
                                        }
                                       
                                        return(
                                            <Geography 
                                                key={index}
                                                geography={geo}
                                                fill={(Object.keys(predictionValue).length != 0 && selected)?threat_color:"#d9dbde"}
                                                // style={{hover: {
                                                //     fill: "#FF6F61",
                                                //     stroke: "#9E1030",
                                                //     strokeWidth: 0.75,
                                                //     outline: "none",
                                                //     transition: "all 250ms"
                                                //         }}}
                                                // data-tooltip-id="my-tooltip"
                                                // data-tooltip-content={geo.properties.name_long}
                                                // data-tooltip-place="top"
                                                // onClick={() => selectCountry(geo.properties.name_long)}
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
                                        <a className="news-link" href={object.link}>{object.title}</a>
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


        {/* <Tooltip id="my-tooltip" /> */}
        </div>
    );
}

export default Predict;