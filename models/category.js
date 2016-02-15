var mongoose = require('mongoose');
var Product = require('../models/Product.js');

var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;
var CategorySchema = new Schema({
  name      		: { type: String, required: true, trim: true }
  , description    :  { type: String, required: true, trim: true }
  , products         : [Product.schema]
});

module.exports = mongoose.model('Category', CategorySchema);