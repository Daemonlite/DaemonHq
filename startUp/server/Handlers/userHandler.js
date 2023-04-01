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
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};


const register = async (req, res) => {
  const {
    fullName,
    email,
    password,
    isAdmin = false,
    profile,
    isVerified = false,
    isInvestor = false,
    location,
    applications = [],
    bio,
  } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  // Validate password
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
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
  const user = new User({
    fullName,
    email,
    password: hashedPassword,
    profile: profileImageUrl,
    isAdmin,
    isVerified,
    isInvestor,
    location,
    bio,
    applications,
  });

  try {
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid user credentials" });
    }
    
    const token = jwt.sign({ fullName: user.fullName, id: user._id, isAdmin: user.isAdmin }, process.env.SECRET, {
      expiresIn: "2d",
    });
    
    res.status(200).json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "2d",
  });
};

const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, {
      new: true,
    });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user info" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

const googleRegistration = async (req,res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { given_name, family_name, email, picture } = ticket.getPayload();
  const fullName = `${given_name} ${family_name}`;
  const location = ""; // Fetch user's location using IP address, as before
  const bio = "";
  const isInvestor = false;
  const password = Math.random().toString(36).slice(-8); // Generate a random password
  const user = new User({
    fullName,
    email,
    password,
    profile: picture,
    location,
    bio,
    isInvestor,
  });
  try {
    await user.save();
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profile: user.profile,
      location: user.location,
      bio: user.bio,
      isInvestor: user.isInvestor,
      token,
    });
  } catch (err) {
    res.status(400).send("Invalid user data");
  }
}

module.exports = {
    getUsers,
    register,
    loginUser,
    deleteUser,
    updateUserInfo,
    getUserById,
    generateToken,
    googleRegistration
}