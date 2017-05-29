/**
 * This file starts the server
 *
 */

var express = require('express');
var path = require('path')

var revroutes = require('./app/routes/revision.server.routes')

var app = express()

app.set('views', path.join(__dirname,'app','views'));

app.use(express.static(path.join(__dirname, 'public')));
//
app.use('/overall',revroutes)

app.get('/data', function(req, res){
	var val = {'Nitrogen': 0.78, 'Oxygen': 0.21, 'Other': 0.01}
	res.json(val);
});

app.listen(3000, function () {
	  console.log('Application listening on port 3000!')
	})
	
module.exports = app;