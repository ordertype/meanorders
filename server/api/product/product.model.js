'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name:  { type: String, required: true, trim: true },
  description:  { type: String, trim: true },
  price:  {type: Number, get: getPrice, set: setPrice }, 
  lastUpdate  :  { type: Date, default: Date.now },
  active: Boolean
});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Product', ProductSchema);




