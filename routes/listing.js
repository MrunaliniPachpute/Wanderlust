const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const listingController = require("../controllers/listings.js");

router.get("/search",listingController.searchListing);

router
  .route("/new")
  //CREATE LISTING
  .get(isLoggedIn, listingController.renderNewForm)
  .post(
    isLoggedIn,
    upload.single('image'),
    validateListing,
    wrapAsync(listingController.postNewListing)
  );
  

router
  .route("/:id")
  //SHOW ROUTE
  .get(wrapAsync(listingController.showListing))
  //DELETE ROUTE
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//INDEX ROUTE
router.get("/", wrapAsync(listingController.index));

router
  .route("/:id/edit")
  //EDIT-UPDATE ROUTE
  .get(isLoggedIn, isOwner, wrapAsync(listingController.editListingForm))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('image'),
    validateListing,
    wrapAsync(listingController.putEditListing)
  );

module.exports = router;
