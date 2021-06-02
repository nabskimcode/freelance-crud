const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: true,
    maxlength: [20, 'Phone number can not be longer than 20 characters'],
  },
  skillset: {
    type: [String],
    required: [true, 'Please add a skillset'],
  },
  hobby: {
    type: [String],
    required: [true, 'Please add a hobby'],
  },
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
