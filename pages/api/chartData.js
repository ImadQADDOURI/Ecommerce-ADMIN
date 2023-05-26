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
  ]);

  res.status(200).json(data);

 }

 else if (req.query.chartType === 'totalSalesLastWeek') {

      // Get the start and end dates for the last week
      const today = new Date();
      const lastWeekStartDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );

      const lastWeekEndDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
    
      // Calculate the total sales for each day of the last week
      const totalSales = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: lastWeekStartDate , $lte : lastWeekEndDate },
            paid: true,
          },
        },
        {
          $unwind: '$line_items',
        },
        
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d', // Format the date as YYYY-MM-DD
                date: '$createdAt',
              },
            },
            totalAmount: {
              $sum: '$line_items.price_data.unit_amount',
            },
          },
        },
        {
          $sort: {
            _id: -1, // Sort in ascending order of _id (date)
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            dayName: {
              $let: {
                vars: {
                  daysOfWeek: [
                    { num: 1, name: 'Sunday' },
                    { num: 2, name: 'Monday' },
                    { num: 3, name: 'Tuesday' },
                    { num: 4, name: 'Wednesday' },
                    { num: 5, name: 'Thursday' },
                    { num: 6, name: 'Friday' },
                    { num: 7, name: 'Saturday' },
                  ],
                },
                in: {
                  $arrayElemAt: [
                    '$$daysOfWeek',
                    { $subtract: [{ $dayOfWeek: { $dateFromString: { dateString: '$_id' } } }, 1] },
                  ],
                },
              },
            },
            totalAmount: 1,
          },
        },
        

      ]);

      res.status(200).json(totalSales);

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
      $unwind: '$line_items',
    },
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
        },
        totalAmount: {
          $sum: '$line_items.price_data.unit_amount',
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

  res.status(200).json(result);

    }

    else if (req.query.chartType === 'PaidUnpaidOrders'){

      const result = await Order.aggregate([
        {
          $facet: {
            paidOrders: [
              { $match: { paid: true } },
              { $group: { _id: null, count: { $sum: 1 } } }
            ],
            unpaidOrders: [
              { $match: { paid: false } },
              { $group: { _id: null, count: { $sum: 1 } } }
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