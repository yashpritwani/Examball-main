const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const HttpError = require("../util/http-error");
const Admin = require("../models/admin");
const Course = require("../models/course");
const Test = require("../models/test");
const Question = require("../models/question");

const adminSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await Admin.findOne({ email: email });
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

  const createdUser = new Admin({
    name,
    email,
    role: "Admin",
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
      "adminTokenPrivateKey",
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
    role: "Admin",
  });
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Admin.findOne({ email: email });
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
      "adminTokenPrivateKey",
      { expiresIn: "1h" }
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

const adminCreateCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, description, image, price } = req.body;
  const createdCourse = new Course({
    name,
    description,
    image,
    price,
    test: [],
  });

  let course;
  try {
    course = await Course.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "Course Creation failed, please try again.",
      500
    );
    return next(error);
  }

  if (course) {
    const error = new HttpError("Course already exists", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdCourse.save({ session: sess });
    // course.Course.push(createdCourse);
    // await course.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating course failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ course: createdCourse });
};

const adminCreateTest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, description, type, course } = req.body;
  const createdTest = new Test({
    name,
    description,
    type,
    course,
  });

  let existingCourse;
  let test;
  try {
    existingCourse = await Course.findById(course);
    test = await Test.findOne({ name: name });
  } catch (err) {
    const error = new HttpError("Test Creation failed, please try again.", 500);
    return next(error);
  }

  if (!existingCourse) {
    const error = new HttpError("Invalid course", 500);
    return next(error);
  }
  if (test) {
    const error = new HttpError("Test Already  Exists", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTest.save({ session: sess });
    existingCourse.test.push(createdTest);
    await existingCourse.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating test failed, please try again.", 500);
    return next(error);
  }
  res.status(201).json({ test: createdTest });
};

// Create Questions Under One Test
const adminCreateQuestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { questionSet, testId } = req.body;
  
  if (testId && questionSet && questionSet.questions) {
    
    try {
      const questions = questionSet.questions;
      let successFullyAddedQuestions = [];
      let unsuccessFullQuestions = [];
      for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
        // Work to be done below
        const createdQuestion = new Question({
          number: question.questionNumber,
          body: question.question,
          explanation: question.explanation,
          options: question.options,
          type: question.type,
          correctAnswer: question.correctAnswer,
          metaData: question.metadata,
          test: testId,
        });
        let existingTest;
        let questionToDb;
        try {
          existingTest = await Test.findById(testId);
          questionToDb = await Question.findOne({ body: question.question });
        } catch (err) {
          console.log(err);
          const error = new HttpError(
            "Test Creation failed, please try again.",
            500
          );
          return next(error);
        }

        if (!existingTest) {
          const error = new HttpError("Invalid Test", 500);
          return next(error);
        }
        if (questionToDb) {
          const error = new HttpError("Question Already  Exists", 500);
          return next(error);
        }
        try {
          const sess = await mongoose.startSession();
          sess.startTransaction();
          await createdQuestion.save({ session: sess });
          existingTest.question.push(createdQuestion);
          await existingTest.save({ session: sess });
          await sess.commitTransaction();
          successFullyAddedQuestions.push(question);
        } catch (err) {
          unsuccessFullQuestions.push(question);
          console.log(err);
        }
      }
      res.status(201).json({ "successFullyAddedQuestions": successFullyAddedQuestions, "unsucessfullQuestions": unsuccessFullQuestions });
    } catch (e) {
      return next(new HttpError("Question Set or Test Id is invalid", 422));
    }
  } else {
    
    return next(new HttpError("Question Set or Test Id is invalid", 422));
  }
};


exports.adminLogin = adminLogin;
exports.adminSignup = adminSignup;
exports.adminCreateCourse = adminCreateCourse;
exports.adminCreateTest = adminCreateTest;
exports.adminCreateQuestions = adminCreateQuestions;
