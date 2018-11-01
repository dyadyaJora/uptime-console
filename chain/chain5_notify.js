let mongoose = require('mongoose');
let config = require('../config');
require('../models/site');
require('../models/notify-query');
let Site = mongoose.model('Site');
let Notify = mongoose.model('Notify');


const MONGO_URI = config.mongodbUri;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

mongoose.connection.once('connected', () => {
  Notify.find({}).populate({path: 'base', model: Site}).exec().then((res) => {
  	let promises = [];

  	res.forEach((item, i) => {
      let p = sendNotify(item.type, item.message, item.data)
        .then(() => {
          return Site.findOneAndUpdate({ _id: item.base._id }, { state: item.base.active ? 'active' : 'stopped' })
        })
        .then(() => {
          return Notify.findOneAndDelete({ _id: item._id});
        });

      promises.push(p);
    });

    Promise.all(promises)
	    .then(arrRes => {
	    	console.log(arrRes, '1');
	  		mongoose.connection.close();
	    })
	    .catch(err => {
	    	console.log(err);
	  		mongoose.connection.close();
	    });
  });
  console.log('Succesfully connected to MongoDB Database');
});

function sendNotify(type, message, data) {
  // TODO
  console.log(type, message, data);

  return new Promise((rs, rj) => {
    rs();
  })
}