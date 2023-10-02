import React, { useEffect } from 'react'
import {useState} from 'react';
import ReactDOM from 'react-dom'
import './BasicDetails.css'
import { useNavigate } from 'react-router-dom';
import { CompoasableMap, Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, ComposableMap } from "react-simple-maps";
import { scaleLinear } from "d3-scale"
import 'bootstrap/dist/css/bootstrap.css'

import COUNTRIES from "../resources/countries.json"
import geoUrl from "./map.json"


var dummy_response = [
    {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'},
    {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'},
    {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'},
    {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'},
    {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'}, {field_name: 'abc', field_value: 'def'},
    {field_name: 'abc', field_value: 'def'}
]




const BasicDetails = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [details, setDetails] = useState([]);
    const [position, setPosition] = useState({center:[20, 0], zoom:1})

    function selectCountry(e){
        setSelectedCountry(e.target.value);
        var target_url = "http://10.1.37.102:9823/africaCountryGeoStats?country=" + e.target.value; 
        fetch(target_url)
            .then(response => response.json())
            .then(json => setDetails(json))
    }

    return(

        <div className="rootdiv">

        <div className="container">

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
                </table>

                {selectedCountry != "" && <div className='details-heading'> Basic Details for {selectedCountry} </div>}

                { selectedCountry != "" && 
                    <table>
                        {details.map(function(object, i){ return(
                            <tr className='details-row' key={i}>
                                <td className='details-cell'>{object.field_name}</td>
                                <td className='details-cell'>{object.field_value}</td>
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


        </div>
        </div>
    );
}

export default BasicDetails;