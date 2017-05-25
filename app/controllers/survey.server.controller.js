var express = require('express');

module.exports.showForm=function(req,res){
	products = req.app.locals.products;
	res.render('survey.pug',{products:products});
}
	
module.exports.showResult=function(req,res){
	console.log(req.body);
	gender = req.body.gender;
	productidx = req.body.vote;
	products = req.app.locals.products;
	surveyresults = req.app.locals.surveyresults;
	if (gender == 0) {
		surveyresults.mp[productidx]++;
	} else {
		surveyresults.fp[productidx]++;
		res.render('surveyresult.pug', {products: products, 
			surveyresults: surveyresults});
	}
}
	
	