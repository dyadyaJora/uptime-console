let mongoose = require('mongoose');
let config = require('../config');
require('../models/site');
require('../models/responce-query');
require('../models/notify-query');
let Site = mongoose.model('Site');
let Responce = mongoose.model('Responce');
let Notify = mongoose.model('Notify');


const MONGO_URI = config.mongodbUri;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

mongoose.connection.once('connected', () => {
  Responce.find({}).populate({path: 'base', model: Site}).exec().then((res) => {
  	let promises = [];

  	res.forEach((item, i) => {
      let needNotify = false, text = '';

      if (item.options.status != item.base.options.status) {
        needNotify = true;
        text += 'Что-то изменилось на сайте ' + item.base.url;
      }

      if (item.options.other != item.base.options.other) {
        needNotify = true;
        // .....
      }

      if (item.options.other != item.base.options.other) {
        needNotify = true;
        // .....
      }

      if (item.options.other != item.base.options.other) {
        needNotify = true;
        // .....
      }

      item.base.notifies && item.base.notifies.forEach(nt => {
        let noti = new Notify({
          type: 'email',
          message: text,
          data: {},
          base: item.base._id
        });

        // TODO: в одну последовательную цепь
        promises.push(Responce.findByIdAndDelete(item._id));
        promises.push(noti.save());
      });
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