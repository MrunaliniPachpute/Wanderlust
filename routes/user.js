const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  //SignUp user get form
  .get(userController.signUpForm)
  //Sign up user post request
  .post(wrapAsync(userController.postSignUp));

router
  .route("/login")
  //Login user get form
  .get(userController.loginForm)
  //login user post request
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/listings/user/login",
      failureFlash: true,
    }),
    userController.login
  );

//logout user
router.get("/logout", userController.logout);

module.exports = router;
