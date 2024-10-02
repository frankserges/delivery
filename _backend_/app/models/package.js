const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const packageSchema = Schema({

    package_id:{type: String, required: false},
    active_delivery_id: {type: String, required: false},
    description : { type: String, required: true },
    weight: { type: Number, required: true}, // in grams
    width: { type: Number, required: true}, // in cm
    height: { type: Number, required: true}, // in cm
    depth: { type: Number, required: true}, // in cm
    from_name  : { type: String, required: true },
    from_address   : { type: String, required: true },
    from_location   : { 
        lat: { type: Number, required: true},
        lng: { type: Number, required: true}
    },
    to_name  : { type: String, required: true },
    to_address   : { type: String, required: true },
    to_location   : { 
        lat: { type: Number, required: true},
        lng: { type: Number, required: true}
    },
    
});

packageSchema.plugin(uniqueValidator); 

module.exports =  mongoose.model('packages', packageSchema); 