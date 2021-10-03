const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");
//const fileUpload = require("../util/file-upload");
const checkAuth = require("../middlewares/check-auth");
const user = require("../models/user");

const router = express.Router();

router.post(
  "/signup",
  // fileUpload.single('image'),
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({
      min: 6,
    }),
  ],
  userController.userSignup
);
router.get('/getOverallAttemptedTest/:userId',userController.getOverallAttemptedTest);

router.post("/login", userController.userLogin);
router.get("/courses", userController.coursesList);
router.get("/getCourseInfo/:courseId", userController.getCourseInfo);
router.get("/tests/:courseId", userController.testsList);
router.get("/getAllEnrolledCourses/:userId", userController.getAllEnrolledCourses);
router.post("/sendMailFromContactUs",userController.sendMailController);
router.post("/forgotPasswordRequest",userController.forgotPassowrdController);
router.use(checkAuth);
router.post('/create-checkout-session/:courseId',userController.enrollCourse);
router.post('/order/success/:courseId',userController.checkAndEnroll);

router.post('/create-payment-intent',userController.fetchUserDetails);
router.get("/fetchUserDetails/:userId", userController.fetchUserDetails);
router.post("/updateUserDetails/:userId", userController.updateUserDetail);
router.post("/updateUserPassword/:userId", userController.updateUserPassword);

router.get("/getTestInfo/:testId", userController.getTestInfo);
router.post("/startTest/:testId",userController.startTest);
router.post("/endTest/:testId",userController.endTest);
router.post("/getAllResults/:testId", userController.getAllResults);
router.post("/getOneResult/:testId/:testSessionId", userController.getOneResult);
router.get("/questions/:testId", userController.questionsList);
router.post("/enrollCourse/:courseId",userController.enrollCourse);
router.post("/checkResult/:testId",userController.checkResult);

module.exports = router;
