const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attemptedTestSchema = new Schema({
  _id:false,
  testId:{type:mongoose.Types.ObjectId},
  testSessionId:{type:String},
  startTime:{type:Date},
  endTime:{type:Date},
  totalScore:{type:Number},
  totalQuestions:{type:Number},
  percentage:{type:String},
  resultObj:[{type:Object}]
},{timestamps:true});
var attemptedTest = mongoose.model('attemptedTest', attemptedTestSchema);

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String},
  // image: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Types.ObjectId}],
  attemptedTest:[attemptedTestSchema],
  temproaryPaymentSessionId:[{type:String,default:''}],
  email: { type: String, required: true, unique: true },
  isActive:{type:Boolean,default:true},
  password: {type: String, required: true, minlength: 6},
});

module.exports = mongoose.model('User', UserSchema);
