let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let siteSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    delay: {
        type: Number,
        default: 360000 // мс
    },
    options: {
        status: Number,
        other: String
    },
    statusContent: Number,
    state: {
        type: String, 
        enum: ['active', 'pending', 'stopped']
    },
    active: Boolean,
    notifies: [],
    lastUpdate: { type: Date, default: Date.now },
    //active: Boolean,
    //inQuery: Boolean,
    needCheck: Boolean
    //owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true
});

mongoose.model('Site', siteSchema);