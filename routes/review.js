const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  validateReview,
  isReviewOwner,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//REVIEWS

router
  .route("/")
  //see all reviews-index
  .get(reviewController.index)
  //post review
  .post(
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.postReview)
  );

//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOwner,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
