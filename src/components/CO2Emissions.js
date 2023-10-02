import React from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './CO2Emissions.css'
import { useNavigate } from 'react-router-dom';
import { CompoasableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, ComposableMap } from "react-simple-maps";
import { scaleLinear } from "d3-scale"
import 'bootstrap/dist/css/bootstrap.css'
import CanvasJSReact from '@canvasjs/react-charts';

import countryDummyResponse from "../dummy_responses/country_co2.json"
import countryYearDummyResponse from "../dummy_responses/country_year_co2.json"

import COUNTRIES from "../resources/countries.json"
import YEARS from "../resources/years.json"


import geoUrl from "./map.json"

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const CO2Emissions = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [pieChartOptionsEnergy, setPieCharOptionsEnergy] = useState({});
    const [pieChartOptionsGHG, setPieChartOptionsGHG] = useState({});
    const [lineChartOptions, setLineChartOptions] = useState({});
    const [position, setPosition] = useState({center:[20, 0], zoom:1})

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
            animationEnabled: true,
            title: {
                text: title
            },
            backgroundColor: "#03adfc",
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
            animationEnabled: true,
            backgroundColor: "#03adfc",
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


    function selectCountry(e){
        setSelectedCountry(e.target.value);
        if(selectCountry == "" || selectYear == ""){
            return;
        }
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then((json) => {
                var title = "Total GHG emissions from fuel combustion per product, " + e.target.value
                const optionsLine = buildLineChartOptions(countryDummyResponse.total_ghg_emission, title);
                setLineChartOptions(optionsLine);
            })
        
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then((json) => {
                var title1 = "Share of total energy supply by product, " + e.target.value + ", " + selectedYear;
                var title2 = "Share of GHG emissions, " + e.target.value + ", " + selectedYear;
                const optionsEnergy = buildPieChartOptions(countryYearDummyResponse.total_energy_supply, title1);
                const optionsGHG = buildPieChartOptions(countryYearDummyResponse.ghg_emission_supply, title2);
                setPieCharOptionsEnergy(optionsEnergy);
                setPieChartOptionsGHG(optionsGHG);
            })
    }


    function selectYear(e){
        setSelectedYear(e.target.value);
        if(selectCountry == "" || selectYear == ""){
            return;
        }
        var target_url = "dummy";
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then((json) => {
                var title1 = "Share of total energy supply by product, " + selectedCountry + ", " + e.target.value;
                var title2 = "Share of GHG emissions, " + selectedCountry + ", " + e.target.value;
                const optionsEnergy = buildPieChartOptions(countryYearDummyResponse.total_energy_supply, title1);
                const optionsGHG = buildPieChartOptions(countryYearDummyResponse.ghg_emission_supply, title2);
                setPieCharOptionsEnergy(optionsEnergy);
                setPieChartOptionsGHG(optionsGHG);
            })

        if(lineChartOptions == {}){
            fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then((json) => {
                var title = "Total GHG emissions from fuel combustion per product, " + selectedCountry;
                const optionsLine = buildLineChartOptions(countryDummyResponse.total_ghg_emission, title);
                setLineChartOptions(optionsLine);
            })
        }
    }

    
    return(
        <div className="container rootdiv">


            <div className='row topdiv'>
            <div className='col leftdiv'>
                <table>
                    <tr>
                        <td className='select-cell'>
                            Country:
                        </td>
                        <td className='select-cell'>
                            <select className="dropdown" defaultValue="" onChange={(e) => selectCountry(e)}>
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

                { selectedYear != "" && selectedCountry != "" &&
                    <table>
                        {countryYearDummyResponse.green_house_data.map(function(object, i){ return(
                            <tr className='details-row' key={i}>
                                <td className='details-cell'>{object.FLOW}</td>
                                <td className='details-cell'>{object.VALUE}</td>
                            </tr>
                        )}
                        )}

                        {countryYearDummyResponse.total_energy_supply.map(function(object, i){ return(
                            <tr className='details-row' key={i}>
                                <td className='details-cell'><p>{object.FLOW} ({object.PRODUCT})</p></td>
                                <td className='details-cell'>{object.VALUE}</td>
                            </tr>
                        )}
                        )}

                        {countryYearDummyResponse.ghg_emission_supply.map(function(object, i){ return(
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
                           translateExtent={[
                            [0, 0],
                            [400, 450]
                          ]}
                           >
                            <Geographies geography={geoUrl} stroke="#000000">
                                {({geographies}) =>
                                    geographies.map((geo, index) => {
                                        const selected = geo.properties.name === selectedCountry
                                        return(
                                            <Geography key={index} geography={geo} fill={selected?"#424fd1":"#d9dbde"}/>
                                        )
                                    })

                                }
                            </Geographies>
                        // </ZoomableGroup>
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
    );
}

export default CO2Emissions;