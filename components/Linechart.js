import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


export default function Linechart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Last Week Sales',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the last week sales data from your API
        const response = await fetch('/api/chartData?chartType=totalSalesLastWeek');
        const salesData = await response.json();

        // Get the day names for the last week in reverse order
        const today = new Date();
        const lastWeekDates = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          lastWeekDates.push(date);
        }
        const dayNames = lastWeekDates.map((date) => {
          const options = { weekday: 'long' };
          return new Intl.DateTimeFormat('en-US', options).format(date);
        });

        // Map the sales data to match the day names and get the total sales for each day
        const updatedData = dayNames.map((dayName) => {
          const matchingData = salesData.find((item) => item.dayName === dayName);
          return matchingData ? matchingData.totalAmount : 0;
        });

        // Update the data state
        setData((prevData) => ({
          ...prevData,
          labels: dayNames,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        }));
      } catch (error) {
        console.log('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-auto md:col-span-2 relative lg:h-[70vh] h-[50vh]  p-4 border rounded-lg bg-white ml-2 mt-2 mr-2 '>
      <Line data={data} />
    </div>
  );
}
