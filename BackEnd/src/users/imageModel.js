var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const imageSchema = new Schema({
    image: String
})

module.exports = mongoose.model('image', imageSchema);