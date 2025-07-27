const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const listingSchema = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res,next) => {
  if (!req.isAuthenticated()) {
    if (req.method === "GET") {
      req.session.redirectUrl = req.originalUrl;
    }
    req.flash("error", "Login/Signup to proceed further!");
    return res.redirect("/listings/user/login");
  }
  //console.log("Im logged in"),
  next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl; 
  }
  next();
}

module.exports.isOwner = async (req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  let userId = res.locals.currUser._id;
  if(!(listing.owner._id.equals(userId))){
    req.flash("error", "Oops! you did not create it!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.isReviewOwner = async (req,res,next)=>{
  let {id, reviewId} = req.params;
  let ReviewDetail = await Review.findById(reviewId);
  let userId = res.locals.currUser._id;
  if(!(ReviewDetail.author._id.equals(userId))){
    req.flash("error", "Oops! you did not create it!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
//  console.log("Im in Validate-listing", req.body);
  let { error } = listingSchema.validate(req.body);
  if (error) {
   // console.log("I caused an error");
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
   // console.log("Listing is now validated")
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
 // console.log("Hi im in validate review and my value is : ", req.body);
  let { error } = reviewSchema.validate(req.body);
  if (error) {
   // console.log("Im caused an error");
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
   // console.log("Im validated in no error"),
    next();
  }
};