const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  // image: { type: String, required: true },
//   admin: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Admin' }]
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);
