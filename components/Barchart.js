import React,{ useEffect, useState }  from 'react';
import {Bar} from 'react-chartjs-2';

import Chart from 'chart.js/auto';


export default function Barchart() {
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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

        // Map the salesData to update the data object
        const updatedData = data.labels.map(month => {
          const matchingData = salesData.find(item => item.monthName === month);
          return matchingData ? matchingData.totalAmount : 0;
        });

        // Update the data state
        setData(prevData => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData
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
    <div className='w-auto md:col-span-2 relative lg:h-[70vh] h-[50vh]  p-4 border rounded-lg bg-white ml-2 mt-2 mr-2 '>
      <Bar
          data={data}
          options={{
            maintainAspectRatio: false
          }}
        />
    </div>
  );
}

