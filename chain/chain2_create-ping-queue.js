let mongoose = require('mongoose');
let config = require('../config');
require('../models/site');
require('../models/request-query');
let Site = mongoose.model('Site');
let Request = mongoose.model('Request');


const MONGO_URI = config.mongodbUri;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
let currentTime = new Date().getTime();

mongoose.connection.once('connected', () => {
  Site.find({needCheck: true, state: 'active'}).then((res) => {
  	let promises = [];

  	res.forEach((item, i) => {
      //console.log(item.lastUpdate, (new Date(item.lastUpdate)).getTime(), (new Date(item.lastUpdate)).getTime() + item.delay < currentTime);
      if((new Date(item.lastUpdate)).getTime() + item.delay < currentTime) {
        promises.push(Site.updateMany({ _id: item._id },{ state: 'pending', needCheck: false } ));

        let x = Request.findOne({ base: item._id })
          .then(req => {
            if (req)
              return new Promise((rs, rj) => { rs(); });

            let r = new Request({
              url: item.url,
              base: item._id
            });
            
            return r.save();
          })

        promises.push(x);
      }
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