let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let notifySchema = new Schema({
    type: {
        type: String,
        enum: ['email', 'webhook', 'push', 'wss'],
        required: true,
    },
    data: { }, 
    message: {
    	type: String,
    	required: true
    },
    base: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
}, {
    timestamps: true
});

mongoose.model('Notify', notifySchema);