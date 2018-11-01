let mongoose = require('mongoose');
let config = require('../config');
require('../models/site');
let Site = mongoose.model('Site');


const MONGO_URI = config.mongodbUri;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);


mongoose.connection.once('connected', () => {
  setInterval(function() {
    Site.updateMany({}, { needCheck: true }, (err, res) => {
    	console.log(err, res);
    });
  }, 5000);
  //cb();
  console.log('Succesfully connected to MongoDB Database');
});