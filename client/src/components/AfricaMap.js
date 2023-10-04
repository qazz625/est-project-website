import React, { useEffect } from 'react'
import {useState} from 'react';
import { Geographies, Geography, Annotation, ZoomableGroup, Sphere, Graticule, ComposableMap } from "react-simple-maps";
import COUNTRIES from "../resources/countries.json"
import geoUrl from "./map.json"

const AfricaMap = (props) => {
    const [position, setPosition] = useState({center:[20, 0], zoom:1});

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
                                const selected = geo.properties.name_long === props.selectedCountry
                                return(
                                    <Geography key={index} geography={geo} fill={selected?"#424fd1":"#d9dbde"} style={{hover: {
                                        fill: "#FF6F61",
                                        stroke: "#9E1030",
                                        strokeWidth: 0.75,
                                        outline: "none",
                                        transition: "all 250ms"
                                        }}}/>
                                )
                            })

                        }
                    </Geographies>
                </ZoomableGroup>
            :
            <p>"LOADING"</p>
        }

    </ComposableMap>
}

export default AfricaMap;