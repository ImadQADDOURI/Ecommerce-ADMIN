import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

import { ComposableMap, Geographies, Geography, Graticule, Sphere, ZoomableGroup } from "react-simple-maps";

import { scaleLinear } from 'd3-scale';
import { jsonData } from "@/public/jsonData";

const geoUrl ="https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json"

let data =jsonData;
  
  
  let transformedData = data

  // Find the minimum and maximum values in the dataset
const min = Math.min(...transformedData.map((d) => d.value));
const max = Math.max(...transformedData.map((d) => d.value));

// Define the color scale based on the minimum and maximum values
const colorScale = scaleLinear()
  .domain([min, max])
  .range(["#ffedea", "#ff5233"]);//.range(['#0000FF', '#FF0000']);




export default function Geo() {

    const [Data, setChartData] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('/api/chartData?chartType=countryCount');
          const data = response.data;

            const formattedData = data.map((item) => ({
                id: item._id,
                value: item.count,
            }));

          setChartData(formattedData);
        
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }, []);
  console.log(Data);

  const [position,setposition]=useState({coordinates:[0,0], zoom : 1});

  const hundelMoveEnd = (position) => {
    setposition(position);
  }

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setposition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setposition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }


  return (
    <Layout>
      <div className=' hidden md:block w-full md:col-span-2 relative h-full  border rounded-lg bg-white ml-2 mt-2 '>
      
      <div className="controls ">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    
      
      <ComposableMap className=' m-4 p-2 h-fit' 
       projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}>



        <ZoomableGroup
        zoom={position.zoom}
        center={position.coordinates}
        onMoveEnd={hundelMoveEnd}
        >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            {data.length > 0 && (
        
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo, index) => {
                        const { id } = geo;
                        const datum = transformedData.find((d) => d.id === id);

                        const fill = datum ? (colorScale(datum.value)) :  "#F5F4F6" /*'#eee'*/;
                        
                        return (
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fill}
                           
                            style={{
                
                                hover: {
                                  fill: "#ff0000",
                                },
                                pressed: {
                                  fill: "#000",
                                },
                              }}
                            />
                        );
                        })
                    }
                    </Geographies>
             
             )}

      </ZoomableGroup>
        
      </ComposableMap>
    </div>

    </Layout>
  );
}
