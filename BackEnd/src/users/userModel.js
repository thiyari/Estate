var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    area: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    propertymode: {
        type: String,
        required: false
    },
    zip: {
        type: String,
        required: false
    },
    areatype: {
        type: String,
        required: false
    },
    phase: {
        type: String,
        required: false
    },
    rooms: {
        type: String,
        required: false
    },
    floor: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        required: false
    },
    property: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    images: [{
        type: String,
        required: false    
    }],
    requests: {
        type: String,
        required: false
    },
    propertyid: {
        type: String,
        required: false
    },
    logstatus: {
        type: String,
        required: true
    },
    commission: {
        type: Number,
        required: false
    }
},
{
    timestamps: true
});

var serviceSchema = new Schema({
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
    requests: {
        type: String,
        required: false
    },
    comments: {
        type: String,
        required: false
    },
},
{
    timestamps: true
});


var contactsSchema = new Schema({
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
    comments: {
        type: String,
        required: false
    },
    requests: {
        type: Boolean,
        required: false
    } 
},
{
    timestamps: true
});

const users = mongoose.model('users', userSchema);
const services = mongoose.model('services', serviceSchema);
const contacts = mongoose.model('contacts', contactsSchema);

module.exports = { 
    users,
    services,
    contacts
}