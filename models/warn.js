const mongoose = require("mongoose");

const warn = mongoose.Schema({
  
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  userID: String,
  reason: String,
  warnedBy: String,
  warnedID: String,
  time: String
  
  
});


module.exports = mongoose.model("Warns", warn);
  
  
  
