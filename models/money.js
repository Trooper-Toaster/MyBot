const mongoose = require("mongoose");

const money = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  userID: String,
  serverID: String,
  money: Number
  
  
});


module.exports = mongoose.model("Money", money);
