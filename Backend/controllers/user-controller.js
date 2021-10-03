const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const HttpError = require("../util/http-error");
const User = require("../models/user");
const Course = require("../models/course");
const Test = require("../models/test");
const Question = require("../models/question");
const { v4:uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const stripe =  require('stripe');
const userSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { firstName, lastName, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    role: "Student",
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "userPrivateKey",
      { expiresIn: "2h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
    role: "Student",
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "userPrivateKey",
      // { expiresIn: "1d" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  // console.log(existingUser);
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    role: existingUser.role,
  });
};

const fetchUserDetails = async (req,res,next) =>{
  let user;
  try {
    user = await User.findOne({_id:req.params.userId},"-password");
  }catch(err){
    console.log(err);
    const error = new HttpError(
      "User does not exist!",
      500
    );
    return next(error);
  }
  //console.log(user)
  return res.json({user:user});
};
const coursesList = async (req, res, next) => {
  let courses;
  try {
    // users = await Course.find({}, "-password");
    courses = await Course.find();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json({ courses: courses });
};

const getCourseInfo =async (req,res,next) =>{
  let course;
  try {
    // users = await Course.find({}, "-password");
    course = await Course.findOne({_id:req.params.courseId});
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching Course failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json({ course: course });
};

const getTestInfo = async (req,res,next) =>{
  let test;
  try {
    test= await Test.findOne({_id:req.params.testId});
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching Test failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json({ test: test });
};

const testsList = async (req, res, next) => {
  let courseId = req.params.courseId;
  let tests;
  try {
    // users = await Course.find({}, "-password");
    tests = await Test.find({ course: courseId });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json({ tests: tests });
};


const questionsList = async (req, res, next) => {
  let testId = req.params.testId;
  let questions;
  try {
    // Add 2 checks here
    // 1 for checking test paid or unpaid
    // If paid then check whether the user has access or not
    questions = await Question.find({ test: testId }, "-explanation -correctAnswer");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching questions failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json({ questions: questions });
};

const createPaymentIntent = async (req,res,next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let courseId = req.params.courseId;
  let {userId} = req.body;
  let existingCourse,existingUser;


  try {
    existingCourse = await Course.findById(courseId);
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Course Enrollment failed, please try again.", 500);
    return next(error);
  }

  if (!(existingCourse && existingUser)) {
    const error = new HttpError("Invalid course", 500);
    return next(error);
  }

  // Check if course already enrolled
  if(existingUser.enrolledCourses.indexOf(courseId)!=-1){
    const error = new HttpError("Course taken already ", 500);
    return next(error);
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: existingCourse.price,
    currency: "INR"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
};

const enrollCourse = async (req, res, next) => {
  const stripe = require('stripe')(process.env.STRIPE_KEY);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let courseId = req.params.courseId;
  let {userId} = req.body;
  let existingCourse,existingUser;


  try {
    existingCourse = await Course.findById(courseId);
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Course Enrollment failed, please try again.", 500);
    return next(error);
  }

  if (!(existingCourse && existingUser)) {
    const error = new HttpError("Invalid course", 500);
    return next(error);
  }

  // Check if course already enrolled
  if(existingUser.enrolledCourses.indexOf(courseId)!=-1){
    const error = new HttpError("Course taken already ", 500);
    return next(error);
  }
  const customSessionId = uuidv4();

  // Payment logic will come here
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: existingUser.email,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: existingCourse.name,
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: existingCourse.price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/user/courses/${existingCourse._id}?success=true&sessionId=${customSessionId}`,
    cancel_url: `${process.env.DOMAIN}/user/courses/${existingCourse._id}?canceled=true&sessionId=${customSessionId}`,
  });



  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    existingUser.temproaryPaymentSessionId.push(customSessionId);
    await existingUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Course Enrollment Failed, please try again.", 500);
    return next(error);
  }
   
  res.status(201).json({  id: session.id });
};

const checkAndEnroll= async (req,res,next) =>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }



  let courseId = req.params.courseId;
  let {userId,flag,sessionId} = req.body;
  let existingCourse,existingUser;
  

  try {
    existingCourse = await Course.findById(courseId);
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Course Enrollment failed, please try again.", 500);
    return next(error);
  }

  if (!(existingCourse && existingUser)) {
    const error = new HttpError("Invalid course", 500);
    return next(error);
  }

  // Check if course already enrolled
  if(existingUser.enrolledCourses.indexOf(courseId)!=-1){
    const error = new HttpError("Course taken already ", 500);
    return next(error);
  }

  // Check if session Id Exist
  const lenenrolledCourse = existingUser.enrolledCourses.length;
  const lenTempSessionId = existingUser.temproaryPaymentSessionId.length;
 if(lenenrolledCourse>lenTempSessionId || !existingUser.temproaryPaymentSessionId.includes(sessionId)){
    const error = new HttpError("Session Id Does Not Exist! ", 500);
    return next(error);
  }



  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    existingUser.enrolledCourses.push(courseId);
    await existingUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Course Enrollment Failed, please try again.", 500);
    return next(error);
  }
  return res.status(201).json({ enrolled: true });
};



const checkResult = async (req, res, next) => {
 // console.log(req.body)
  let testId = req.params.testId;
  const userId = req.body.userId;
  const answersMarked = req.body.answersMarked;

  let existingUser,test;

  try {
    test = await Test.findById(testId);
    existingUser = await User.findOne({ _id: userId});
  } catch (err) {
    const error = new HttpError(
      "Incorrect Data",
      500
    );
    return next(error);
  }


  if(existingUser._id!=req.body.userId){
    const error = new HttpError(
      "Incorrect User Data",
      500
    );
    return next(error);
  }

  // Check if the user is enrolled to a particluar course
  if( existingUser.enrolledCourses.indexOf(test.course[0]) == -1){
    const error = new HttpError(
      "Incorrect User Data",
      500
    );
    return next(error);
  }

  let questions;
  try {
    questions = await Question.find({ test: testId }, `number type
    explanation correctAnswer`);
   //console.log("🚀 ~ file: user-controller.js ~ line 315 ~ getResult ~ questions", questions)
    resultObj = [];
    totalScore = 0;
    questions.map(question=>{
      correctPoints = 0;
      wrongPoints = 0;
      modifiedAnswers = [];
      if(answersMarked[question.number] && answersMarked[question.number].length!=0){
        if(question.type=="Radio"){
            //Indexing Is 0 Based , So Im decrementing all the correct answers
            //And will increment all the markedAnswers In Frontend
           modifiedAnswers  = (parseInt(answersMarked[question.number])+1).toString();
            if(modifiedAnswers.includes(question.correctAnswer[0])){
              correctPoints += 1;
            }else{
              wrongPoints += 1;
            }
        
        }else{
          modifiedAnswers = answersMarked[question.number].map(obj=>(parseInt(obj)+1).toString());
          checkModifiedAnswers = modifiedAnswers.sort();
          correctModifiedAnswers= question.correctAnswer.sort();

          if(JSON.stringify(checkModifiedAnswers)==JSON.stringify(correctModifiedAnswers)){
            correctPoints += 1;
          }else{
            wrongPoints += 1;
          }
        }
       
      }else{
        answersMarked[question.number] = [];
      }
      
      totalScore += correctPoints;
      const obj = {
        _id:question._id,
        number:question.number,
        //explanation:question.explanation,
        //correctAnswer:question.correctAnswer,
        type:question.type,
        answerSelected:modifiedAnswers,
        score:correctPoints
      };
      resultObj.push(obj);
    });
   //console.log(resultObj)
    //console.log(totalScore)
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching questions failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json({ 
    testId: testId,
    userId:userId,
    totalScore:totalScore,
    totalQuestions:questions.length,
    percentage:(Math.round(totalScore * 100) / questions.length).toFixed(2),
    resultObj:resultObj
   });
};

const getAllResults = async (req,res,next) => {


  let testId = req.params.testId;
  const userId = req.body.userId;

  let existingUser,test;

  try {
    test = await Test.findById(testId);
    existingUser = await User.findOne({ _id: userId});
  } catch (err) {
    const error = new HttpError(
      "Incorrect Data",
      500
    );
    return next(error);
  }


  if(existingUser._id!=req.body.userId){
    const error = new HttpError(
      "Incorrect User Data",
      500
    );
    return next(error);
  }

  // Check if the user is enrolled to a particluar course
  if( existingUser.enrolledCourses.indexOf(test.course[0]) == -1){
    const error = new HttpError(
      "Incorrect User Data",
      500
    );
    return next(error);
  }

  let allAttemptedTest;
  let attemptedTest=[];
  try{
    allAttemptedTest = await User.find({_id:userId,"attemptedTest.testId":testId},"attemptedTest");
    // console.log(allAttemptedTest)

    if(allAttemptedTest.length==0){
      attemptedTest = [];
    }else{
      attemptedTest = allAttemptedTest[0].attemptedTest.filter(obj => obj.testId == testId);

    }
  }catch(err){
    console.log(err);
    const error = new HttpError(
      "Fetching questions failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.status(200).send({attemptedTest:attemptedTest});
  
};
const getOneResult  = async (req,res,next) =>{
  let testId = req.params.testId;
  let testSessionId = req.params.testSessionId;
  const userId = req.body.userId;

  let existingUser,test;

  try {
    test = await Test.findById(testId);
    existingUser = await User.findOne({ _id: userId});
  } catch (err) {
    const error = new HttpError(
      "Incorrect Data",
      500
    );
    return next(error);
  }


  if(existingUser._id!=req.body.userId){
    const error = new HttpError(
      "Incorrect User Data",
      500
    );
    return next(error);
  }

  // Check if the user is enrolled to a particluar course
  if( existingUser.enrolledCourses.indexOf(test.course[0]) == -1){
    const error = new HttpError(
      "Incorrect User Data",
      500
    );
    return next(error);
  }

  let attemptedTest=[];
  try{
    attemptedTest = await User.find({_id:userId,"attemptedTest.testId":testId,"attemptedTest.testSessionId":testSessionId},{"attemptedTest.$":1});
   // console.log("🚀 ~ file: user-controller.js ~ line 520 ~ getOneResult ~ attemptedTest", attemptedTest)
   
    if(attemptedTest.length==0){
      attemptedTest = [];
    }else{
      attemptedTest = attemptedTest[0];

    }
  }catch(err){
    console.log(err);
    const error = new HttpError(
      "Fetching questions failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.status(200).send({attemptedTest:attemptedTest});

};

const getOverallAttemptedTest = async (req,res,next) =>{
  const userId = req.params.userId;
  // console.log("Heyyyyyy",userId)

  const userAttemptedTest = await User.find({_id:userId},"attemptedTest")
  .then(testObj => {
    // console.log("dgdgf",testObj)
    res.status(200).send({attemptedTest:testObj[0].attemptedTest});
  })
  .catch(err=>res.status(400).send({err:err}));

};

const startTest = async (req,res,next) =>{
  let testId = req.params.testId;
  let {userId} = req.body;
  let existingTest,existingUser;
  
  try {
    existingTest = await Test.findById(testId);
  //  console.log("🚀 ~ file: user-controller.js ~ line 431 ~ startTest ~ existingTest ", existingTest )
    existingUser = await User.findById(userId);
  //  console.log("🚀 ~ file: user-controller.js ~ line 433 ~ startTest ~ existingUser", existingUser)
  } catch (err) {
    const error = new HttpError("Test has not started, please try again.", 500);
    return next(error);
  }
  if (!(existingTest && existingUser)) {
    const error = new HttpError("Invalid Test", 500);
    return next(error);
  }
  const testObj = {
    testId:testId,
  startTime:new Date().toISOString(),
  totalQuestions:existingTest.question.length,
  testSessionId:uuidv4()
  };
  // console.log("🚀 ~ file: user-controller.js ~ line 444 ~ startTest ~ testObj", testObj)
  User.findByIdAndUpdate(userId,{
    $push:{
      "attemptedTest":testObj
    }
  },{new:true,useFindAndModify:false})
  .then(obj=>{
    // console.log(obj)
    res.status(200).send({startTest:true,startTime:testObj.startTime,testSessionId:testObj.testSessionId});
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send({startTest:false});
  });

};

const endTest = async (req,res,next) =>{
  let testId = req.params.testId;
  let {userId,testSessionId,resultObj,percentage,testEndTime} = req.body;
  let existingTest,existingUser;
  // console.log(userId)
  
  try {
    existingTest = await Test.findById(testId);
 // console.log("🚀 ~ file: user-controller.js ~ line 431 ~ startTest ~ existingTest ", existingTest )
    existingUser = await User.findById(userId);
  //console.log("🚀 ~ file: user-controller.js ~ line 433 ~ startTest ~ existingUser", existingUser)
  } catch (err) {
    const error = new HttpError("Test has not started, please try again.", 500);
    return next(error);
  }
  if (!(existingTest && existingUser)) {
    const error = new HttpError("Invalid Test", 500);
    return next(error);
  }
  // console.log(percentage)
  // console.log("testSessionId",req.body.testSessionId)
  const endTime = new Date().toISOString();
  const testTimeDiff = testEndTime-endTime;
  // console.log("🚀 ~ file: user-controller.js ~ line 605 ~ endTest ~ diff", testTimeDiff)
  User.findOneAndUpdate({_id:userId,"attemptedTest.testSessionId":testSessionId},{
      $set:{
        "attemptedTest.$.endTime":endTime,
        "attemptedTest.$.resultObj":req.body.resultObj,
        "attemptedTest.$.totalScore":req.body.totalScore,
        "attemptedTest.$.percentage":percentage
      }
  },{new:true,useFindAndModify:false})
  .then(obj=>{
    // console.log("-->",obj)
    res.status(200).send({endTest:true});
  })
  .catch(err=>{
    console.log(err);
    res.status(500).send({endTest:false});
  });

};


const getAllEnrolledCourses = async (req,res,next) =>{
  let userCourses;
  
  try {
    let userCourses = [];
   const userCourseDetail = await  User.findById(req.params.userId,"enrolledCourses").then(user=>{
     // console.log(user)
      Course.find(
          { _id: { $in: user.enrolledCourses }}
          ).then(courses=>{
            userCourses = courses;
            return res.json({userCourses:userCourses});
           // console.log(userCourses)
          });
    });
      
    
    // let courseNames = Courses.find(
    //   { _id: { $in: courseIdArray }}).map((c)=>{ return c.courseName });
    
  }catch(err){
    console.log(err);
    const error = new HttpError(
      "User does not exist!",
      500
    );
    return next(error);
  }
};

const sendMailController = async (req,res,next) =>{
  // console.log(req.body)
  const {name,email,country,mobile,body} = req.body.data;
  sendMailForContactUs(name,email,country,mobile,body);
  res.status(200).send({message:"Mail Sent!"});
};

const forgotPassowrdController = async (req,res,next) =>{
  const {email} = req.body;
  const userObj = await User.findOne({email:email}).catch(err=>err);
  // console.log("🚀 ~ file: user-controller.js ~ line 683 ~ forgotPassowrd ~ userObj", userObj)

  if(userObj!={}){
  const newPassword = Math.random().toString(36).slice(2);
  const hashedPassword = await bcrypt.hash(newPassword, 12);
   User.findOneAndUpdate({email:email},{
    $set:{
      password:hashedPassword
    }
  },{new:true,useFindAndModify:false}).then(obj=>{
      sendMailForForgotPassword(obj.firstName,obj.email,newPassword);
      res.status(200).send({message:"Email Has Been Sent To You!"});
  })
  .catch(err=>{
    res.status(400).send({message:"Something Went Wrong!"});

  });


  }else{
    res.status(200).send({message:"User Does Not Exist!"});
  }
  
};
function sendMailForContactUs(name,email,country,mobile,body){
  var mail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nodedummy328@gmail.com',
        pass: 'Nodedummy@123'
      }
    });

    var mailOptions = {
      from: 'nodedummy328@gmail.com',
      to:`patidarparas13@gmail.com`,
      subject: 'Anyone Contacted You! From ExamBall ',
      html: `<h3>Here is the details,</h3>
   </br>
   <p>Name: ${name}</p>
   <p>Email: ${email}</p>
   <p>Mobile: ${mobile}</p>
   <p>Country: ${country}</p>
   <p>Body: ${body}</p>
   </br>
   <p><i>Generated By ExamBall System</i></p>
   </br>
   <p>Thanks and Regards</p>
   <p>From ExamBall</p>
   `
  //  ,
  //     attachments: [{
  //         path: 'resources/static/assets/invoice/invoice.pdf'
  //     }]
   };
  //  console.log("No")
   mail.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
   });
}

function sendMailForContactUs(name,email,country,mobile,body){
  var mail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass:process.env.EMAIL_PASS
      }
    });

    var mailOptions = {
      from:  process.env.EMAIL,
      to:`patidarparas13@gmail.com`,
      subject: 'Anyone Contacted You! From ExamBall ',
      html: `<h3>Here is the details,</h3>
   </br>
   <p>Name: ${name}</p>
   <p>Email: ${email}</p>
   <p>Mobile: ${mobile}</p>
   <p>Country: ${country}</p>
   <p>Body: ${body}</p>
   </br>
   <p><i>Generated By ExamBall System</i></p>
   </br>
   <p>Thanks and Regards</p>
   <p>From ExamBall</p>
   `
  //  ,
  //     attachments: [{
  //         path: 'resources/static/assets/invoice/invoice.pdf'
  //     }]
   };
  //  console.log("No")
   mail.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
   });
}

function sendMailForForgotPassword(name,email,password){
  // console.log(password)
  var mail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass:process.env.EMAIL_PASS
      }
    });

    var mailOptions = {
      from:  process.env.EMAIL,
      to:email,
      subject: 'New Generated Password From ExamBall ',
      html: `<h3>Hey,${name}</h3>
   </br>
 
   <p>New Password: ${password}</p>
   </br>
   <p><i>Generated By ExamBall System</i></p>
   </br>
   <p>Thanks and Regards</p>
   <p>From ExamBall</p>
   `
  //  ,
  //     attachments: [{
  //         path: 'resources/static/assets/invoice/invoice.pdf'
  //     }]
   };
  //  console.log("No")
   mail.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
   });
}

const updateUserDetail =async (req,res,next) =>{
  const userId = req.params.userId;
  const {firstName,lastName,email}= req.body;
  try{
    const userDetails = await User.findByIdAndUpdate(
      userId,
      {
        $set:{
          firstName:firstName,
          lastName:lastName,
          email:email
        }
      },{new:true,useFindAndModify:false});
    if(userDetails=={}){
      return res.status(500).send({updated:false,message:"Error Updating Details!"});
    }
    return res.status(200).send({updated:true,userData:userDetails,message:"Details Updated!"});

  }catch(err){
    res.status(500).send({updated:false,message:"Error Updating Details!"});
  }
};

const updateUserPassword = async (req,res,next) =>{
  const userId = req.params.userId;
  const {currentPassword,newPassword,newConfirmPassword}= req.body;
  
  let existingUser = await User.findById(userId);
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return res.status(500).send({updated:false,message:"Invalid User!"});
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(currentPassword, existingUser.password);
  } catch (err) {
    return res.status(500).send({updated:false,message:"Please Enter Correct Current Password!"});

  }

  if (!isValidPassword) {
    return res.status(500).send({updated:false,message:"Please Enter Correct Current Password!"});

  }


  try{
    const hashedPassword = await bcrypt.hash(newConfirmPassword, 12);

    const userDetails = await User.findByIdAndUpdate(
      userId,
      {
        $set:{
          password:hashedPassword
        }
      },{new:true,useFindAndModify:false})
    .then(userDetails=>{
      return res.status(200).send({updated:true,userData:userDetails,message:"Details Updated!"});
    });

  }catch(err){
    res.status(500).send({updated:false,message:"Error Updating Details!"});
  }
};


exports.userLogin = userLogin;
exports.userSignup = userSignup;
exports.coursesList = coursesList;
exports.testsList = testsList;
exports.questionsList = questionsList;
exports.enrollCourse = enrollCourse;
exports.checkResult = checkResult;
exports.getCourseInfo = getCourseInfo;
exports.fetchUserDetails = fetchUserDetails;
exports.getTestInfo =getTestInfo;
exports.startTest = startTest;
exports.endTest = endTest;
exports.getAllResults = getAllResults;
exports.getOneResult = getOneResult;

exports.getAllEnrolledCourses = getAllEnrolledCourses;

exports.getOverallAttemptedTest = getOverallAttemptedTest;
exports.sendMailController  = sendMailController ;
exports.forgotPassowrdController = forgotPassowrdController;

exports.checkAndEnroll = checkAndEnroll;
exports.updateUserDetail = updateUserDetail;
exports.updateUserPassword = updateUserPassword;