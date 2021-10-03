const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, minlength: 20 },
  type: {type: Number,required: true}, // 0 for free test and 1 for paid test
  course: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Course' }],
  time:{type:String},
  question: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Question' }]
});

testSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Test', testSchema);
