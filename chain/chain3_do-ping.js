let mongoose = require('mongoose');
let config = require('../config');
let rp = require('request-promise');
require('../models/site');
require('../models/request-query');
require('../models/responce-query');
let Site = mongoose.model('Site');
let Request = mongoose.model('Request');
let Responce = mongoose.model('Responce');


const MONGO_URI = config.mongodbUri;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

mongoose.connection.once('connected', () => {
  Request.find({}).then((res) => {
  	let promises = [];

  	res.forEach((item, i) => {
      let x = rp({
        url: item.url,
        simple: false,
        resolveWithFullResponse: true
      }).then((res) => {
        // if (err) {
        //   console.log('Что-то пошло не так! проверьте интернет соединение воркера do-ping');
        //   return;
        // }
        console.log(res.statusCode);

        let r = new Responce({
          base: item._id,
          options: {
            status: res.statusCode,
            other: ''
          }
        });

        return r.save();
      }).then((x) => {
        console.log(x, '==');
        return Request.findByIdAndDelete(item._id);
      });

      promises.push(x);
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