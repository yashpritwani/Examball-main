const express = require("express");
const { check } = require("express-validator");

const adminController = require("../controllers/admin-controller");
//const fileUpload = require("../util/file-upload");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post(
  "/signup",
  // fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({
      min: 6,
    }),
  ],
  adminController.adminSignup
);

router.post("/login", adminController.adminLogin);

router.use(checkAuth);

// Create
router.post("/create-course",adminController.adminCreateCourse);
router.post("/create-test",adminController.adminCreateTest);
router.post("/create-questions",adminController.adminCreateQuestions);

// // Update
// router.patch("/update-course",adminController.adminUpdateCourse);
// router.patch("/update-test",adminController.adminUpdateTest);
// router.patch("/update-question",adminController.adminUpdateQuestion);

// //Delete
// router.delete("/delete-course",adminController.adminDeleteCourse);
// router.delete("/delete-test",adminController.adminDeleteTest);
// router.delete("/delete-question",adminController.adminDeleteQuestion);

module.exports = router;
