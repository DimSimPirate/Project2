
/**
 * 
 * 
 * THIS FILE IS JUST FOR TESTING QUERIES
 * 
 * 
 */


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/COMP5347DB',function () {
	  console.log('mongodb connected')
	});

var revSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
			    versionKey: false 
		})

var Revision = mongoose.model('Revision', revSchema, 'Wikipedia')

//Update Example
//for all documents with 'anon' field, we set the value of 'anon' to 'yes'
// see:http://mongoosejs.com/docs/documents.html

/*
Revision.update({'anon':{'$exists':true}},
	{$set:{'anon':'yes'}},{'multi':true},function(err,result){
		if (err){
			console.log("Update error!")
		}else{
			console.log(result);
		}	
	})

*/

/*
//Find distinct registered users from article "Australia"
Revision.distinct('user', {'anon':{'$exists':false},'title':'Australia'}, function(err,users){
	if (err){
		console.log("Query error!")
	}else{
		console.log("There are " + users.length + " distinct users in Australia");
	}	
})
*/

/*
//Find earliest revision of "Australia"

Revision.find({'title':'Australia'})
	.sort({'timestamp':1})
	.limit(1)
	.exec(function(err,result){
	if (err){
		console.log("Query error!")
	}else{
		console.log("The earliest revision in Australia is:");
		console.log(result)
	}	
})
*/
/*
 * aggregation example shell command
 * 
 * db.getCollection('revisions').aggregate([
	{$match:{title:"Australia"}},
	{$group:{_id:"$user", numOfEdits: {$sum:1}}},
	{$sort:{numOfEdits:-1}},
	{$limit:5}
])

APIs see: http://mongoosejs.com/docs/api.html#aggregate-js

*/

var mostRevisions = [
	{'$group':{'_id':"$title", 'numOfRev': {$sum:1}}},
	{'$sort':{numOfRev:-1}},
	{'$limit':1}
]
var mostRevTitle;
var mostRevNumber;
Revision.aggregate(mostRevisions, function(err, results){
	if (err){
		console.log("Aggregation Error")
	}else{
		console.log(results);
		mostRevTitle = results[0]._id;
		mostRevNumber = results[0].numOfRev;
		console.log("The article with the most revisions is: " + mostRevTitle);
		console.log("The number of revisions are: " + mostRevNumber);
	}
})
/*
var leastRevisions = [
	{'$group':{'_id':"$title", 'numOfRev': {$sum:1}}},
	{'$sort':{numOfRev:1}},
	{'$limit':1}
]
var leastRevTitle;
var leastRevNumber;
Revision.aggregate(leastRevisions, function(err, results){
	if (err){
		console.log("Aggregation Error")
	}else{
		leastRevTitle = results[0]._id;
		leastRevNumber = results[0].numOfRev;
		console.log("The article with the least revisions is: " + leastRevTitle);
		console.log("The number of revisions are: " + leastRevNumber);
	}
})

// TODO article edited by largest number of unique users
var largestUnique = [
	{'$group':{_id:""}}
]

// TODO article edited by smallest number of unique users

// TODO Article with longest history
var longestHistory = [
	{'$sort':{'timestamp': -1}}
]

var longestHistTitle;
var longestHistDate;
Revision.find({}).sort({'timestamp':1}).limit(1).exec(function(err,result){
	if (err){
		console.log("Query error!")
	}else{
		longestHistTitle = result[0].title;
		longestHistDate = result[0].timestamp;
		console.log("The earliest revision title is: " + longestHistTitle);
		console.log("The date of creation is: " + longestHistDate);
	}
})

// TODO Article with shortest history
*/
var shortestHistTitle;
var shortestHistDate;
var shortestHistory = Revision.aggregate(
	[
		{$sort: {title:1, timestamp:1}},
		{$group: {_id:"$title",firstRevision: {$first:"$timestamp"}}},
	    {$sort: {timestamp:1}},
	    {$limit:1} 
	],
	{ allowDiskUse: true}
)
print(shortestHistory);
/*
var shortestHistory = [
    {$sort: {title:1, timestamp:1}},
    {$group: {_id:"$title", firstRevision: {$first:"$timestamp"}}},
    {$sort: {timestamp:1}},
    {$limit:1}
]
Revision.aggregate(shortestHistory, {allowDiskUse: true}, function(err, results){
	if (err){
		console.log("Aggregation Error for shortest history")
	}else{
		shortestHistTitle = result[0]._id;
		shortestHistDate = result[0].firstRevision;
		print("The shortest history title is: " + shortestHistTitle);
		print("The date of creation is: " + shortestHistDate);
	}
})
*/

//find the user who made the most non-minor revisions on article "Australia"

