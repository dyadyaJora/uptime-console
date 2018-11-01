let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let responceQuerySchema = new Schema({
	options: {
    	status: Number,
    	other: String
    },
    base: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
}, {
    timestamps: true
});

mongoose.model('Responce', responceQuerySchema);

