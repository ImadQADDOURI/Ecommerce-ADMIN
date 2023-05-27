import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";


import { ComposableMap, Geographies, Geography } from "react-simple-maps";
const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";


export default function OrdersPage() {
  const [orders,setOrders] = useState([]);
  useEffect(() => {
  }, []);
  return (
    <Layout>
      <div className='hidden md:block w-full md:col-span-2 relative h-full  border rounded-lg bg-white ml-2 mt-2 '>
      <ComposableMap className=' m-4 p-2 h-fit'>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
      
    </Layout>
  );
}
