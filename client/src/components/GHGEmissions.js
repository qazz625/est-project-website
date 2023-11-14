import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './GHGEmissions.css'
import { useNavigate } from 'react-router-dom';
import { CompoasableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, ComposableMap } from "react-simple-maps";
import { scaleLinear } from "d3-scale"
import 'bootstrap/dist/css/bootstrap.css'
import CanvasJSReact from '@canvasjs/react-charts';

import countryDummyResponse from "../dummy_responses/country_ghg.json"
import countryYearDummyResponse from "../dummy_responses/country_year_ghg.json"

import COUNTRIES from "../resources/countries.json"
import YEARS from "../resources/years.json"
import endpoint_base from "../resources/endpoint_base.json"


import geoUrl from "./map.json"

import NavBar from "./NavBar"

import { Tooltip } from 'react-tooltip'




var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TARGET_URL1_PREFIX = endpoint_base.ENDPOINT_BASE + "africaCountryAllYearGHGStat?country="
const TARGET_URL2_PREFIX = endpoint_base.ENDPOINT_BASE + "africaCountryEnergyStats?country="
const DUMMY_TARGET = 'https://jsonplaceholder.typicode.com/todos/1';
const USE_DUMMY_API = 0;

const GHGEmissions = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [pieChartOptionsEnergy, setPieCharOptionsEnergy] = useState({});
    const [pieChartOptionsGHG, setPieChartOptionsGHG] = useState({});
    const [lineChartOptions, setLineChartOptions] = useState({});
    const [position, setPosition] = useState({center:[20, 0], zoom:1})
    const [countryYearResponse, setCountryYearResponse] = useState({});

    function buildPieChartOptions(arr, title){
        var total = 0;
        for(var i=0; i<arr.length; i++){
            total += arr[i].VALUE;
        }

        var dataPoints = []
        for(var i=0; i<arr.length; i++){
            dataPoints.push({
                y: Math.round(arr[i].VALUE*1.0 / total * 100),
                label: arr[i].PRODUCT
            })
        }

        const optionsEnergy = {
            exportEnabled: true,
            // animationEnabled: true,
            title: {
                text: title
            },
            backgroundColor: "rgba(255,255,255,0.0)",
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: dataPoints
            }]
        }
        return optionsEnergy;
    }

    function buildLineChartOptions(arr, title){

        console.log("AA");
        console.log(arr);

        var dataPoints = {};
        for(var i=0; i<arr.length; i++){
            if(!(arr[i].PRODUCT in dataPoints)){
                dataPoints[arr[i].PRODUCT] = []
            }
            dataPoints[arr[i].PRODUCT].push({ x: parseInt(arr[i].TIME), y: arr[i].VALUE})
        }
        console.log(dataPoints);

        var data = [];
        for(var key in dataPoints){
            data.push({
                type: "stackedArea",
                name: key,
                showInLegend: true,
                dataPoints: dataPoints[key]
            })
        }

        console.log(data);

        const optionsLine = {
            exportEnabled: true,
            // animationEnabled: true,
            backgroundColor: "rgba(255,255,255,0.0)",
			title: {
				text: title
			},
            axisY: {
				title: "GHG Emission (in MtCO2eq)"
            },
            axisX: {
				title: "Year"
            },
			toolTip: {
				shared: true
			},
            data: data
		}
        return optionsLine;
    }


    function selectCountry(countryName){
        setSelectedCountry(countryName);
        document.getElementById("country-dropdown").value = countryName;
        if(countryName == "" || selectedYear == ""){
            return;
        }

        var target_url1;
        var target_url2;
        if(USE_DUMMY_API == 0){
            target_url1 = TARGET_URL1_PREFIX + countryName;
            target_url2 = TARGET_URL2_PREFIX + countryName + "&" + "year=" + selectedYear;
        }
        else{
            target_url1 = DUMMY_TARGET;
            target_url2 = DUMMY_TARGET;
        }
        

        fetch(target_url1)
            .then(response => response.json())
            .then((json) => {
                var title = "Total GHG emissions from fuel combustion per product, " + countryName
                var optionsLine;
                if(USE_DUMMY_API == 0){
                    optionsLine = buildLineChartOptions(json.total_ghg_emission, title);   
                }
                else{
                    optionsLine = buildLineChartOptions(countryDummyResponse.total_ghg_emission, title);
                }
                setLineChartOptions(optionsLine);
            })
        
        fetch(target_url2)
            .then(response => response.json())
            .then((json) => {
                var title1 = "Share of total energy supply by product, " + countryName + ", " + selectedYear;
                var title2 = "Share of GHG emissions, " + countryName + ", " + selectedYear;
                var optionsEnergy;
                var optionsGHG;
                if(USE_DUMMY_API == 0){
                    optionsEnergy = buildPieChartOptions(json.total_energy_supply, title1);
                    optionsGHG = buildPieChartOptions(json.ghg_emission_supply, title2);
                    setCountryYearResponse(json);
                }
                else{
                    optionsEnergy = buildPieChartOptions(countryYearDummyResponse.total_energy_supply, title1);
                    optionsGHG = buildPieChartOptions(countryYearDummyResponse.ghg_emission_supply, title2);
                } 
                setPieCharOptionsEnergy(optionsEnergy);
                setPieChartOptionsGHG(optionsGHG);

                console.log(json);
            })
    }


    function selectYear(e){
        setSelectedYear(e.target.value);
        if(selectedCountry == "" || e.target.value == ""){
            return;
        }

        // console.log(selectedCountry);
        // console.log(e.target.value);
        // console.log(lineChartOptions);
        // console.log(Object.keys(lineChartOptions).length);

        var target_url1;
        var target_url2;

        if(USE_DUMMY_API == 0){
            target_url1 = TARGET_URL1_PREFIX + selectedCountry;
            target_url2 = TARGET_URL2_PREFIX + selectedCountry + "&" + "year=" + e.target.value;
        }
        else{
            target_url1 = DUMMY_TARGET;
            target_url2 = DUMMY_TARGET;
        }
        
        

        fetch(target_url2)
            .then(response => response.json())
            .then((json) => {
                var title1 = "Share of total energy supply by product, " + selectedCountry + ", " + e.target.value;
                var title2 = "Share of GHG emissions, " + selectedCountry + ", " + e.target.value;
                var optionsEnergy;
                var optionsGHG;
                if(USE_DUMMY_API == 0){
                    optionsEnergy = buildPieChartOptions(json.total_energy_supply, title1);
                    optionsGHG = buildPieChartOptions(json.ghg_emission_supply, title2);
                    setCountryYearResponse(json);
                }
                else{
                    optionsEnergy = buildPieChartOptions(countryYearDummyResponse.total_energy_supply, title1);
                    optionsGHG = buildPieChartOptions(countryYearDummyResponse.ghg_emission_supply, title2);
                }
                setPieCharOptionsEnergy(optionsEnergy);
                setPieChartOptionsGHG(optionsGHG);
                console.log(json);
            })

        if(Object.keys(lineChartOptions).length === 0){
            fetch(target_url1)
            .then(response => response.json())
            .then((json) => {
                var title = "Total GHG emissions from fuel combustion per product, " + selectedCountry;
                var optionsLine;
                if(USE_DUMMY_API == 0){
                    optionsLine = buildLineChartOptions(json.total_ghg_emission, title);
                }
                else{
                    optionsLine = buildLineChartOptions(countryDummyResponse.total_ghg_emission, title);

                }
                setLineChartOptions(optionsLine);
            })
        }
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

                { selectedYear != "" && selectedCountry != "" &&
                    <div className='details-heading'> Key emissions figures for {selectedYear}, {selectedCountry} </div>
                }

                { selectedYear != "" && selectedCountry != "" && Object.keys(countryYearResponse).length != 0 &&
                    <table>
                        {countryYearResponse.green_house_data.map(function(object, i){ return(
                            <tr className='details-row' key={i}>
                                <td className='details-cell'>{object.FLOW}</td>
                                <td className='details-cell'>{object.VALUE}</td>
                            </tr>
                        )}
                        )}

                        {countryYearResponse.total_energy_supply.map(function(object, i){ return(
                            <tr className='details-row' key={i}>
                                <td className='details-cell'><p>{object.FLOW} ({object.PRODUCT})</p></td>
                                <td className='details-cell'>{object.VALUE}</td>
                            </tr>
                        )}
                        )}

                        {countryYearResponse.ghg_emission_supply.map(function(object, i){ return(
                            <tr className='details-row' key={i}>
                                <td className='details-cell'><p>{object.FLOW} ({object.PRODUCT})</p></td>
                                <td className='details-cell'>{object.VALUE}</td>
                            </tr>
                        )}
                        )}

                    </table>
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
                                                fill={selected?"#424fd1":"#d9dbde"}
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


        { selectedYear != "" && selectedCountry != "" &&
            <div className='row bottomdiv'>
                <CanvasJSChart options = {pieChartOptionsEnergy}/>
            </div>
        }

        { selectedYear != "" && selectedCountry != "" &&
            <div className='row bottomdiv'>
                <CanvasJSChart options = {pieChartOptionsGHG}/>
            </div>
        }

        { selectedYear != "" && selectedCountry != "" &&
            <div className='row bottomdiv'>
                <CanvasJSChart options = {lineChartOptions} />
            </div>
        }


        </div>
        <Tooltip id="my-tooltip" />
        </div>
    );
}

export default GHGEmissions;