import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Linechart from "@/components/Linechart";
import Barchart from "@/components/Barchart";
import Piechart from "@/components/Piechart";

function ChartComponent() {


  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/chartData?chartType=countryCount');
        const data = response.data;

        setChartData(data);
      
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
console.log('-->data :'+chartData);




  const [chartData2, setChartData2] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response2 = await axios.get('/api/chartData?chartType=totalSalesLastWeek');
        const data2 = response2.data;

        setChartData2(data2);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  console.log('----------------------datat2');
  console.log(chartData2);






  const [chartData3, setChartData3] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response3 = await axios.get('/api/chartData?chartType=totalSalesLastYear');
        const data3 = response3.data;

        setChartData3(data3);
      
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  console.log(chartData3);

  const [chartData4, setChartData4] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response4 = await axios.get('/api/chartData?chartType=PaidUnpaidOrders');
        const data4 = response4.data;

        setChartData4(data4);
      
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  console.log(chartData4);
  

  return (
    <Layout >
      <div className="justify-between">


 <h1>Total Sales Last Week</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
 
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-600">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-500">
            <tr>
                <th scope="col" class="px-6 py-3">
                day
                </th>
                <th scope="col" class="px-6 py-3">
                total
                </th>
              
                </tr>
                </thead>
                <tbody>
                  {chartData2.map((item) => (
                          <tr key={item._id}  class="bg-white border-b  ">
                            <td class="px-6 py-4"> {item.dayName.name} </td>
                            <td class="px-6 py-4">   {item.totalAmount}$</td>
                            
                          </tr>
                        ))}
                      
                </tbody>
                </table>
</div>
    
      

    <Linechart/>
    <br></br>
    <h1>Total Sales this Year</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-600">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-500">
          <tr >
            <th scope="col" class="px-6 py-3">Month</th>
            <th scope="col" class="px-6 py-3">Total Sales</th>
            
          </tr>
          </thead>

          <tbody>
      {chartData3.map((item) => (
        <tr key={item._id} class="bg-white border-b ">
          <td class="px-6 py-4">{item.monthName}   </td>
          <td class="px-6 py-4">{item.totalAmount}$</td>
          
        </tr>
      ))}
       </tbody>
      </table>
    </div>

    <Barchart />
    <br></br>
    <h1>Paid & Unpaid Orders</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
      
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-600">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-500">
          <tr >
            <th scope="col" class="px-6 py-3">Paid Orders</th>
            <th scope="col" class="px-6 py-3">Unpaid Orders</th>
            
          </tr>
          </thead>

          <tbody>

          
      {chartData4.map((item) => (
        <tr key={item._id} class="bg-white border-b ">
          <td class="px-6 py-4">{item.paidOrders.count} </td>
          <td class="px-6 py-4">{item.unpaidOrders.count} </td>
        </tr>
      ))}
      
      </tbody>
      </table>
    </div>

    <Piechart/>
    <br></br>

    <h1>Country Count</h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-600">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-500">
          <tr >
            <th scope="col" class="px-6 py-3">Country</th>
            <th scope="col" class="px-6 py-3">Count</th>
            
          </tr>
          </thead>

          <tbody>
      {chartData.map((item) => (
        
          <tr key={item._id} class="bg-white border-b ">
          <td  class="px-6 py-4">{item._id} </td>
          <td  class="px-6 py-4"> {item.count}</td>
          </tr>
          
          
        
      ))}
       </tbody>
      </table>
    </div>
    </div>



    </Layout>
    
  );
}

export default ChartComponent;
