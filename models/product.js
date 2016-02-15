var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;

var ProductSchema = new Schema({
  name          : { type: String, required: true, trim: true }
  ,price	   : { type: Number, required: true }
  ,stock  : { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);