/**
 * 
 */
var mongoose = require('./db')

var RevisionSchema = new mongoose.Schema(
		{title: String, 
		 timestamp:String, 
		 user:String, 
		 anon:String},
		 {
			    versionKey: false 
		}
)

RevisionSchema.statics.findTitleLatestRev = function(title, callback){
	
	return this.find({'title':title})
	.sort({'timestamp':-1})
	.limit(1)
	.exec(callback)
}

/*
RevisionSchema.statics.getOverallStats = function (callback) {
	message = "YARR THIS BE STUFF";
	return callback(0, message);
}
*/
/*
RevisionSchema.statics.TEST = function (callback) {
	var mostRevisions = [
		{'$group':{'_id':"$title", 'numOfRev': {$sum:1}}},
		{'$sort':{numOfRev:-1}},
		{'$limit':1}
	]
	
	this.aggregate(mostRevisions, function(err, results){
		console.log(results);
		if (err){
			console.log("Aggregation Error")
			return callback(1, null);
		} else {

			rev = {mostRevTitle: results[0]._id, mostRevAmount: results[0].numOfRev}
			return callback(0, rev);
		}	
	})	
	//return Revision.aggregate(mostRevisions).exec(callback);
}
*/
var Revision = mongoose.model('Revision', RevisionSchema, 'Wikipedia');

module.exports = Revision;

/*
module.exports.getMostRev = function(callback) {
	var mostRevisions = [
		{'$group':{'_id':"$title", 'numOfRev': {$sum:1}}},
		{'$sort':{numOfRev:-1}},
		{'$limit':1}
	]
	var mostRevTitle;
	var mostRevNumber;
	Revision.aggregate(mostRevisions, function(err, results){
		console.log(results);
		if (err){
			console.log("Aggregation Error")
			return callback(1, null);
		} else {
			console.log("TEST");
			console.log(Revision.find({'title':"Australia"}).limit(1));
			rev = {mostRevTitle: results[0]._id, mostRevAmount: results[0].numOfRev}
			return callback(0, rev);
		}	
	})
}
*/