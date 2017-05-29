var Revision = require("../models/revision")

module.exports.showTitleForm=function(req,res){
	res.render("overall.pug")
}

var overallStats = {
		"mostRevisions": {
			"title": "null",
			"amount": 0
		}, 
		"leastRevisions": {
			"title": "null", 
			"amount": 0
		}, 
		"editedByLargestGroup" : {
			"title": "null", 
			"amount": 0
		}, 
		"editedBySmallestGroup" : {
			"title": "null", 
			"amount": 0
		}, 
		"longestHistory": {
			"title": "null", 
			"date": 0
		}, 
		"shortestHistory": {
			"title": "null", 
			"date": 0
		}
}
module.exports.getOverall = function(req, res) {
	
	getMostRevisions();
	getLeastRevisions();
	getLargestUnique();
	getLeastUnique();
	getLongestHistory();
	getShortestHistory();
		
	res.send(overallStats);
}

getMostRevisions = function() {
	var mostRevisions = [
		{'$group':{'_id':"$title", 'numOfRev': {$sum:1}}},
		{'$sort':{numOfRev:-1}},
		{'$limit':1}
	]
	Revision.aggregate(mostRevisions, function(err, results){
		if (err){
			console.log("Aggregation Error")
		} else {
			overallStats.mostRevisions.title = results[0]._id;
			overallStats.mostRevisions.amount = results[0].numOfRev;
		}
	});
}

getLeastRevisions = function() {
	var leastRevisions = [
		{'$group':{'_id':"$title", 'numOfRev': {$sum:1}}},
		{'$sort':{numOfRev:1}},
		{'$limit':1}
	]
	Revision.aggregate(leastRevisions, function(err, results){
		if (err){
			console.log("Aggregation Error")
		} else {
			overallStats.leastRevisions.title = results[0]._id;
			overallStats.leastRevisions.amount = results[0].numOfRev;
		}
	})
}

//TODO: implement
getLargestUnique = function() {
	
}

//TODO: implement
getLeastUnique = function() {
	
}

getLongestHistory = function() {
	Revision.find({}).sort({'timestamp':1}).limit(1).exec(function(err,result){
		if (err){
			console.log("Query error!")
		}else{
			overallStats.longestHistory.title = result[0].title;
			overallStats.longestHistory.date = result[0].timestamp;

		}
	})
}

getShortestHistory = function() {
	var shortHistory = [
	    {$sort: {title:1, timestamp:1}},
	    {$group: {'_id':"$title",'firstRevision': {$first:"$timestamp"}}},
	    {$sort: {'timestamp':1}},
	    {$limit:1} 
	]
	var result = Revision.aggregate(shortHistory).allowDiskUse(true).exec(function(err, data) {
		if (err) {
			console.log("Aggregation error");
		} else {
			console.log(data);
			overallStats.shortestHistory.title = data[0]._id;
			overallStats.shortestHistory.date = data[0].firstRevision;
		}
	});
}

module.exports.getLatest=function(req,res){
	title = req.query.title

	Revision.findTitleLatestRev(title, function(err,result){
		
		if (err){
			console.log("Cannot find " + title + ",s latest revision!")
		}else{
			console.log(result)
			revision = result[0]
			res.render('revision.pug',{title: title, revision:revision})
		}	
	})	

}
/*

*/