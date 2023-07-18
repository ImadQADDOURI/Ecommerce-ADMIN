import React,{ useEffect, useState }  from 'react';
import {Bar} from 'react-chartjs-2';

import Chart from 'chart.js/auto';


export default function Barchart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Year Sales',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the last year sales data from your API
        const response = await fetch('/api/chartData?chartType=totalSalesLastYear');
        const salesData = await response.json();

        // Extract sales data for each month
        const sales = Array.from({ length: 12 }, (_, index) => {
          const matchingData = salesData.find(item => item._id.month === index + 1);
          return matchingData ? matchingData.totalAmount : 0;
        });

        // Create an array of month names for all months
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const currentIndex = new Date().getMonth();

        // Reorder the sales data and labels array
        const newSales = [
          ...sales.slice(currentIndex+1),
          ...sales.slice(0, currentIndex+1)
        ];

        const newLabels = [
          ...labels.slice(currentIndex+1),
          ...labels.slice(0, currentIndex+1)
        ];

        // Update the data state with the updated sales data and labels
        setData(prevData => ({
          ...prevData,
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newSales
            }
          ]
        }));
      } catch (error) {
        console.log('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-auto md:col-span-2 relative lg:h-[70vh] h-[50vh] p-4 border rounded-lg bg-white ml-2 mt-2 mr-2 '>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}


