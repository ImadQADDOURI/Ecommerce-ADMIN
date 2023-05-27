import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

import { ComposableMap, Geographies, Geography, Graticule, Sphere } from "react-simple-maps";
const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


import { ZoomableGroup } from "react-simple-maps"


export default function Geo() {

  useEffect(() => {
  }, []);


  const [position,setposition]=useState({coordinates:[0,0], zoom : 1});

  const hundelMoveEnd = (position) => {
    setposition(position);
  }

  return (
    <Layout>
      <div className='hidden md:block w-full md:col-span-2 relative h-full  border rounded-lg bg-white ml-2 mt-2 '>
      <ComposableMap className=' m-4 p-2 h-fit'>
      <ZoomableGroup
      zoom={position.zoom}
      center={position.coordinates}
      onMoveEnd={hundelMoveEnd}
      >
        <Sphere  stroke="#808080" strokeWidth={0.2}/>
        <Graticule stroke="#808080" strokeWidth={0.2} />
          <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }

        </Geographies>

      </ZoomableGroup>
        
      </ComposableMap>
    </div>
      
    </Layout>
  );
}
