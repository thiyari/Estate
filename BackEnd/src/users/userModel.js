var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    phase: {
        type: String,
        required: true
    },
    rooms: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    property: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String    
    }]
});

module.exports = mongoose.model('users', userSchema);