import React,{ useState, useEffect }  from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Piechart() {

const [data, setData] = useState( {
  labels: ['Paid orders', 'Unpaid orders'],
  datasets: [
    {
      label: 'Paid & Unpaid orders',
      data: [12, 18],
      backgroundColor: [
       
      'rgba(75, 192, 192, 0.2)',
      'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',

      ],
      borderWidth: 1,
    },
  ],
});
useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch the paid and unpaid orders data from your API
      const response = await fetch('/api/chartData?chartType=PaidUnpaidOrders');
      const ordersData = await response.json();
      console.log('ordersData');
      console.log(ordersData);

      // Update the data object with the count of paid and unpaid orders
      const updatedData = [
        ordersData[0].paidOrders.count || 0,
        ordersData[0].unpaidOrders.count || 0,
      ];

      // Update the data state
      setData(prevData => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: updatedData,
          },
        ],
      }));
    } catch (error) {
      console.log('Error fetching orders data:', error);
    }
  };

  fetchData();
}, []);


  return(
  
  <>
 <div className='w-auto md:col-span-2 relative  h-[50vh]  p-4 border rounded-lg bg-white ml-2 mt-2 mr-2   flex   justify-center  '>
   
   <Pie  data={data} />
 </div>
  </>
  )
  
  
}
