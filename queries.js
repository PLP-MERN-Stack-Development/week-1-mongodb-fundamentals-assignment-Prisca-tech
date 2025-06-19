// Task 2: CRUD Operations
use plp_bookstore
db.books.find({ genre: { $in: ["Fiction"] } })
db.books.find({ published_year: { $gt: 1952 } })
db.books.find({ author: { $in: ["George Orwell"] } })
db.books.updateOne(
{ title: "To Kill a Mockingbird" },
{ $set: { price: 14.99 } }
)
db.books.deleteOne({ title: '1984'})

// Task 3: Advanced Queries
db.books.find({
in_stock: true,
published_year: { $gt: 2010 }
})

db.books.find({
in_stock: true,
published_year: { $gt: 2010 }
},
{
title: 1,
author: 1,
price: 1,
_id: 0
}
)

// ascending order
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).sort({ price: 1 })
// descending order
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).sort({ price: -1 })

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
.skip(0)
.limit(5)

// Task 4: Aggregation Pipeline
db.books.aggregate([{
$group: {
_id: "$genre", averagePrice: { $avg: "$price" }}
}])

db.books.aggregate([{
$group: {
_id: "$author",
bookCount: { $sum: 1 }}},
{
$sort: { bookCount: -1 }},
{
$limit: 1},
{
$project: {
_id: 0,
author: "$_id",
bookCount: 1}
}])

db.books.aggregate([{
$project: {decade: {
$concat: [{ $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },"s"]}}},
{$group: {
_id: "$decade",
count: { $sum: 1 }}},
{$sort: { _id: 1 }  // sort by decade
}])

// Task 5: Indexing
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: 1 })
db.books.find({ title: "To Kill a Mockingbird" }).explain("executionStats")
db.books.find({
author: "Harper Lee", published_year: 1960}).explain("executionStats")
