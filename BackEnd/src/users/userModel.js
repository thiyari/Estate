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
    username: {
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
        type: String,
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
        type: String,
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
    address: {
        type: String,
        required: true
    },
    images: [{
        type: String    
    }],
    requests: {
        type: String,
        required: true
    },
    propertyid: {
        type: String,
        required: true
    },
    logstatus: {
        type: String,
        required: true
    }
});

var contactSchema = new Schema({
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
    phone: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    requests: {
        type: String
    }
});

const users = mongoose.model('users', userSchema);
const contacts = mongoose.model('contacts', contactSchema);

module.exports = { 
    users,
    contacts
}