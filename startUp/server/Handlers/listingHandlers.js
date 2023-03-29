const Listings = require("../Models/listingModel");
const Company = require("../Models/companyModel");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const getListings = async (req, res) => {
  try {
    const list = await Listings.find();
    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve listings" });
  }
};

const getListingsById = async (req,res) => {
  const { id } = req.params;
  try {
    const list = await Listings.findById(id);
    if (!list) {
      return res.status(404).json({ message: "Listing not found" });
    }
    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve Listing" });
  }
}

const createListing = async (req, res) => {
  const {
    headLine,
    companyName,
    descr,
    revenueGenerated,
    image,
    comp,
    comments,
    bids,
    views
  } = req.body;

  if (
    !headLine ||
    !descr ||
    !revenueGenerated ||
    !image ||
    !comp ||
    !companyName
  ) {
    return res.status(400).json({ message: "please add required fields" });
  }

  let logoImage;
  try {
    const result = await cloudinary.uploader.upload(image);
    logoImage = result.secure_url;
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to upload  image" });
  }

  let company;
  try {
    company = await Company.findById(comp);
  } catch (error) {
    console.log(error);
  }
  if (!company) {
    return res.status(400).json({ message: "Company not found" });
  }

  const lists = new Listings({
    headLine,
    descr,
    companyName,
    revenueGenerated,
    image: logoImage,
    comp,
    comments:[],
    bids:[],
    views:[]

  });

  try {
    await lists.save();
    company.listings.unshift(lists);
    await company.save();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
  return res.status(201).json(lists);
};

const deleteListing = async (req,res) => {
    const id = req.params.id;

    let listing;
    try {
      listing = await Listings.findOne({ _id: id });
      if (!listing) {
        return res
          .status(404)
          .json({ message: "The specified Listing was not found." });
      }
      await Listings.deleteOne({ _id: id });
      await Company.updateOne(
        { _id: listing.comp },
        { $pull: { listings: { _id: listing._id } } }
      );
    } catch (err) {
      return res.status(500).json({
        message:
          "Unable to delete the Listing. An internal server error has occurred.",
      });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted the  Listing." });
}
module.exports = {
    getListings,
    createListing,
    deleteListing,
    getListingsById
}
