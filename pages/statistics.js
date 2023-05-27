import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  console.log('-->data2 :'+chartData2);



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
    <Layout>

        <div>
      <h1>countryCount</h1>
      {chartData.map((item) => (
        <div key={item._id}>
          <p>Country: {item._id}  Count: {item.count}</p>
          <p></p>
        </div>
      ))}
    </div>

    <div>
      <h1>totalSalesLastWeek</h1>
      {chartData2.map((item) => (
        <div key={item._id}>
          <p>day: {item.dayName.name} day: {item.dayName.num}  total: {item.totalAmount}$</p>
          <p></p>
        </div>
      ))}
    </div>

    <div>
      <h1>totalSalesLastYear</h1>
      {chartData3.map((item) => (
        <div key={item._id}>
          <p>monthName: {item.monthName}    munth: {item._id.month}    total: {item.totalAmount}$</p>
          <p></p>
        </div>
      ))}
    </div>

    <div>
      <h1>totalSalesLastYear</h1>
      {chartData4.map((item) => (
        <div key={item._id}>
          <p>paidOrders: {item.paidOrders.count}    unpaidOrders: {item.unpaidOrders.count} </p>
          <p></p>
        </div>
      ))}
    </div>

    </Layout>
    
  );
}

export default ChartComponent;
