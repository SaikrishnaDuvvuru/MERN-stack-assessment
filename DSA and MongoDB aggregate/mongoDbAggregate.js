
db.sales.insertMany([
    {
      
      "date": ISODate("2024-06-15T00:00:00Z"),
      "store": "Store A",
      "items": [
          {
              "name": "item1",
              "quantity": 5,
              "price": 10.0
          },
          {
              "name": "item2",
              "quantity": 3,
              "price": 20.0
          }
      ]
  }
  
  ]);


  // Aggregate Query
  
  db.sales.aggregate([
    {
      $unwind: "$items"
    },
    {
      $project: {
        store: 1,
        month: { $dateToString: { format: "%Y-%m", date: "$date" } },
        itemRevenue: { $multiply: ["$items.quantity", "$items.price"] },
        itemPrice: "$items.price"
      }
    },
    {
      $group: {
        _id: { store: "$store", month: "$month" },
        totalRevenue: { $sum: "$itemRevenue" },
        averagePrice: { $avg: "$itemPrice" }
      }
    },
    {
      $project: {
        store: "$_id.store",
        month: "$_id.month",
        totalRevenue: 1,
        averagePrice: 1,
        _id: 0
      }
    },
    {
      $sort: { store: 1, month: 1 }
    }
  ])
  
  