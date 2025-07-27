const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.index = (req, res) => {
  let { id } = req.params;
  res.redirect(`/listings/${id}`);
};

module.exports.postReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Thank you for your review!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  //deleting in review array
  await Review.findByIdAndDelete(reviewId);

  //deleting in listing reviews array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  //redirect to show page by getting listing from listing id.
  req.flash("success", "Review deleted Successfully!");
  res.redirect(`/listings/${id}`);
};
