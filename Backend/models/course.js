const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, minlength: 20 },
  image: { type: String, required: true },
  price: {type: Number, required: true},
  test: [{ type: mongoose.Types.ObjectId, ref: 'Test' }]
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Course', courseSchema);
