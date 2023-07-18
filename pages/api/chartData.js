import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";

export default async function handler(req,res) {
  await mongooseConnect();



 if (req.query.chartType === 'countryCount') {
  const data = await Order.aggregate([
    {
      $group: {
        _id: '$country',
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: 1 // Sort by country name in ascending order
      }
    }
  ]);

  res.status(200).json(data);

 }



 else if (req.query.chartType === 'totalSalesLastWeek') {
  // Get the start and end dates for the last week
  const today = new Date();
  const lastWeekStartDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );
  const lastWeekEndDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  // Calculate the total sales for each day of the last week
  const totalSales = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: lastWeekStartDate, $lte: lastWeekEndDate },
        paid: true,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
          },
        },
        totalAmount: {
          $sum: '$totalPrice',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  // Calculate the day name for each entry
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const totalSalesWithDayName = totalSales.map((sales) => {
    const date = new Date(sales._id);
    const dayName = daysOfWeek[date.getDay()];
    return { ...sales, dayName };
  });
   //console.log(totalSalesWithDayName);
  res.status(200).json(totalSalesWithDayName);
}





    
 else if (req.query.chartType === 'totalSalesLastYear') {
  const result = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1),
          $lte: new Date(),
        },
        paid: true, // Only consider paid orders
      },
    },
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
        },
        totalAmount: {
          $sum: '$totalPrice',
        },
      },
    },
    {
      $addFields: {
        monthName: {
          $let: {
            vars: {
              monthsInString: [
                '',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
            },
            in: {
              $arrayElemAt: ['$$monthsInString', '$_id.month'],
            },
          },
        },
      },
    },
    {
      $sort: {
        '_id.month': -1,
      },
    },
  ]);

  // Sort the result in descending order of months
  result.sort((a, b) => b._id.month - a._id.month);
  
  //console.log(result);
  res.status(200).json(result);
}





    else if (req.query.chartType === 'PaidUnpaidOrders'){

      const result = await Order.aggregate([
        {
          $facet: {
            paidOrders: [
              { $match: { paid: true } },
              { $group: { _id: 'paidOrders', count: { $sum: 1 } } }
            ],
            unpaidOrders: [
              { $match: { paid: false } },
              { $group: { _id: 'unpaidOrders', count: { $sum: 1 } } }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            paidOrders: { $arrayElemAt: ['$paidOrders', 0] },
            unpaidOrders: { $arrayElemAt: ['$unpaidOrders', 0] }
          }
        }
      ]);

      res.status(200).json(result);

    } 
}