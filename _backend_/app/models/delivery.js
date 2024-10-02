const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const deliverySchema = Schema({

    package_id:{type: String, required: false},
    delivery_id: {type: String, required: false},
    pickup_time: { type: Date, default: Date.now }, 
    start_time: { type: Date, default: Date.now }, 
    end_time: { type: Date, default: Date.now },
    location   : { 
        lat: { type: Number, required: true},
        lng: { type: Number, required: true}
    },
    status  : { type: String, 
                enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed']
                
                },


});

deliverySchema.plugin(uniqueValidator); 

module.exports =  mongoose.model('delivery', deliverySchema); 