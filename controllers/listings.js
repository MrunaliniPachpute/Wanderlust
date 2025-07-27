const { response } = require("express");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const mapToken = process.env.MAP_PRIMARY_KEY;



module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("Listings/index.ejs", { allListings });
};

module.exports.searchListing = async (req,res)=>{
  let queryRecieved = req.query.q;
  let searchItem = await Listing.find({title : queryRecieved});
  if(searchItem.length>0){
    let id = searchItem[0]._id
    return res.redirect(`/listings/${id}`);
  }
  req.flash("error", "No destination found with that title")
  res.redirect(`/listings`);
}

module.exports.renderNewForm = (req, res) => {
  res.render("Listings/new.ejs");
};

module.exports.postNewListing = async (req, res) => {
  const url = `https://atlas.microsoft.com/geocode?api-version=2025-01-01&query=${req.body.location} ${req.body.country}&top=1&subscription-key=${mapToken}`;

  let response = await fetch(url);
  let myData = await response.json();

  //console.log(myData.features[0].geometry);

  let { title, description, image, price, location, country } = req.body;
  let data = {
    title,
    description,
    image: { url: image },
    price,
    location,
    country,
    owner: req.user._id,
  };

  const newListing = new Listing(data);

  newListing.geometry = myData.features[0].geometry;

  let savedListing = await newListing.save();

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };
    savedListing = await newListing.save();
  }

  console.log("savedListing ",savedListing);
  req.flash("success", "New Listing created Successfully!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listItem = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  //console.log(listItem);
  if (!listItem) {
    req.flash("delete", "Listing you requested for does not exist.");
    res.redirect("/listings");
  } else {
    res.render("Listings/show.ejs", { listItem });
  }
};

module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  let ListItem = await Listing.findById(id);
  if (!ListItem) {
    req.flash("delete", "Listing you requested for does not exist.");
    res.redirect("/listings");
  }

  let originalUrl = ListItem.image.url;
  // console.log(originalUrl);
  // originalUrl = originalUrl.replace("/upload", "/upload/w_250,h_250/e_blur:300/");
  // console.log(originalUrl);
  res.render("Listings/edit.ejs", { ListItem, originalUrl });
};

module.exports.putEditListing = async (req, res) => {
  let { id } = req.params;
  let { title, description, image, price, location, country } = req.body;
  let data = {
    title,
    description,
    price,
    location,
    country,
  };
  let listing = await Listing.findByIdAndUpdate(id, data);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    (listing.image = { url, filename }), await listing.save();
  }
  req.flash("success", "Listing updated Successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted Successfully!");
  res.redirect("/listings");
};
