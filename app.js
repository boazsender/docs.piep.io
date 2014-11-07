const fs = require('fs');
const express = require('express');
const yaml = require('js-yaml');

var app = express();

app.use('/:endpoint', function(req, res){
  var endpoint_data = yaml.safeLoad(fs.readFileSync('./data/'+req.params.endpoint+'.yml'));
  res.send(JSON.stringify(endpoint_data));
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});