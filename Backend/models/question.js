const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  number: {type: Number, required:true},
  body: { type: String, required: true, minlength: 5 },
  explanation: { type: String, required: true, minlength: 5 },
  options: {type: Object,required: true},
  type: { type: String, required: true},
  correctAnswer: {type: Object,required: true},
  metaData: {type: Object}, 
  test: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Test' }]
});

questionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', questionSchema);
