const Company = require("../Models/companyModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const getCompanies = async (req, res) => {
  try {
    const comp = await Company.find();
    return res.status(200).json(comp);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve componies and startups" });
  }
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const comp = await Company.findById(id);
    if (!comp) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json(comp);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve company" });
  }
}
const addCompany = async (req, res) => {
  const {
    companyName,
    location,
    logo,
    description,
    contactEmail,
    officePhoneNumber,
    advertisements,
    user,
    type,
    netWorth,
    services,
    category,
    website
    
  } = req.body;

  let logoImage;
  try {
    const image = req.file;
    const result = await cloudinary.uploader.upload(logo);
    logoImage = result.secure_url;
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to upload profile image" });
  }
  if (
    !companyName ||
    !location ||
    !logo ||
    !description ||
    !contactEmail ||
    !officePhoneNumber ||
    !user ||
    !type ||
    !netWorth ||
    !services ||
    !category 
   
  ) {
    return res.status(400).json({ message: "please fill out required fields" });
  }



  const start = await Company.create({
    companyName,
    location,
    logo: logoImage,
    description,
    contactEmail,
    officePhoneNumber,
    advertisements:[],
    listings: [],
    ratings: [],
    jobs:[],
    user,
    type,
    netWorth,
    services,
    category,
    website
  });

  return res.status(201).json(start)


};


const updateCompanyInfo = async (req, res) => {
  const compId = req.params.id;
  const updatedInfo = req.body;

  const upcompInfo = await Company.findByIdAndUpdate(compId, updatedInfo, {
    new: true,
  });

  if (!upcompInfo) {
    return res.status(404).json({ message: "company not found" });
  }

  res.status(200).json(upcompInfo);
};

const deleteCompany = async (req, res) => {
  const compId = req.params.id;

  const comp = await Company.findByIdAndDelete(compId);

  if (!comp) {
    return res.status(404).json({ message: "company not found" });
  }

  res.status(200).json({ message: "company deleted successfully" });
};

module.exports = {
  getCompanies,
  deleteCompany,
  updateCompanyInfo,
  addCompany,
  getCompanyById,
  
};
