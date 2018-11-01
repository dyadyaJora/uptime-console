let mongoose = require('mongoose');
let config = require('./config');
require('./models/site');
let Site = mongoose.model('Site');


module.exports.Site = Site;
module.exports.action = function(cb) {
  const MONGO_URI = config.mongodbUri;

  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URI);


  mongoose.connection.once('connected', () => {
    cb();
    console.log('Succesfully connected to MongoDB Database');
    mongoose.connection.close();
  });
}