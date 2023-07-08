import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";

/*
import { ResponsiveChoropleth,ResponsiveChoroplethCanvas } from "@nivo/geo";
import { geoData } from "@/public/geoData";
 import { jsonData } from "@/public/jsonData"; 
import { Box, useTheme } from "@mui/material";

*/

export default function Geo() {/*

    const [Data, setChartData] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('/api/chartData?chartType=countryCount');
          const data = response.data;
  

        // const formattedData = Object.entries(data).map(([_id,count]) => {
        // return { id:_id,value: count}
        // });


            const formattedData = data.map((item, index) => ({
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



  const testData = jsonData ;


  const MyResponsiveChoropleth = ({ data  }) => (
    <ResponsiveChoropleth
        data={testData}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: -1 }}
        colors="nivo"
        domain={[ 0, 1000000 ]}
        unknownColor="#666666"
        label="properties.name" 
        valueFormat=".2s"
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#ffffff"
        
        fill={[
            {
                match: {
                    id: 'CAN'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'CHN'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'ATA'
                },
                id: 'gradient'
            }
        ]}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
  
  return (
    <Layout>
      <div className='hidden md:block md:col-span-2  border rounded-lg bg-white '>
      
        <Box m="1.5rem 2.5rem">
        <Box
        mt="0"
        height="80vh"
       
        borderRadius="4px"
      >
      <MyResponsiveChoropleth data={testData} />

</Box></Box>
    </div>
      
    </Layout>
  );
*/}
