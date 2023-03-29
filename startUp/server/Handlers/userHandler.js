const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve users" });
  }
};

const register = async (req, res) => {
    const {
      fullName,
      email,
      password,
      isAdmin,
      profile,
      isVerified,
      isInvestor,
      location,
      applications,
    } = req.body;
  
    // Validate input
    if ( !email || !password ) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
  
    // Validate password
    if (
      !password.match(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/
      )
    ) {
      return res.status(400).json({
        message:
          "Password should contain at least 1 symbol, 1 number, and be at least 8 characters long",
      });
    }
  
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    }
  
    // Upload profile image
    let profileImageUrl;
    try {
      const image = req.file;
      const result = await cloudinary.uploader.upload(profile);
      profileImageUrl = result.secure_url;
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: "Failed to upload profile image" });
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profile: profileImageUrl,
      isAdmin,
      isVerified,
      isInvestor,
      location,
      applications: [],
    });
  
    return res.status(201).json(user);
  };
  

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    !user && res.status(400).json("user cant be found");
    if (user && (await bcrypt.compare(password, user.password))) {
      const { fullName, id, isAdmin} = user;
      const token = jwt.sign({ fullName, id, isAdmin }, process.env.SECRET, {
        expiresIn: "2d",
      });
  
      res.status(200).json({
        ...user._doc,
        token,
      });
    } else {
      res.status(400).json("invalid user credentials");
    }
  };
  
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: "2d",
    });
  };
  
  const updateUserInfo = async (req, res) => {
    const userId = req.params.id;
    const updatedInfo = req.body;
  
    const upUserInfo = await User.findByIdAndUpdate(userId, updatedInfo, {
      new: true,
    });
  
    if (!upUserInfo) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.status(200).json(upUserInfo);
  };
  const deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    const user = await User.findByIdAndDelete(userId);
  
    if (!user) {
      return res.status(404).json({ message: "user   not found" });
    }
  
    res.status(200).json({ message: "user  deleted successfully" });
  };

module.exports = {
    getUsers,
    register,
    loginUser,
    deleteUser,
    updateUserInfo
}