const fs = require('fs');
const express = require('express');
const stylus = require('stylus');
const nib = require('nib');
const yaml = require('js-yaml');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.use('/deploy/:page', function(req, res){
  var page = req.params.page;
  res.render(page);
});

app.use('/endpoints/:endpoint', function(req, res){
  var endpoint = req.params.endpoint;
  var endpoint_data = yaml.safeLoad(fs.readFileSync('./data/'+ endpoint +'.yml'));
  res.render('endpoint', { resource_name: endpoint, endpoints: endpoint_data });
});

app.use('/overview', function(req,res){
  res.render('overview');
});

app.use('/', function(req,res){
  res.render('index');
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});