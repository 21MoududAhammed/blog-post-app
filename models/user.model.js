const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  products:[
    {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
