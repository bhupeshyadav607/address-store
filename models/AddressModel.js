const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  address: String,
  city: String,
  state: String,
  zip: Number,
  country: String,
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
