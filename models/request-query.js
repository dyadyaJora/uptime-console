let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let requestQuerySchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    base: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
}, {
    timestamps: true
});

mongoose.model('Request', requestQuerySchema);