const router = require('express').Router()
const {getUsers,register,loginUser,updateUserInfo,deleteUser,getUserById} = require('../Handlers/userHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getUsers)
router.post('/register',register)
router.post('/login',loginUser)
router.put('/:id',updateUserInfo)
router.delete('/:id',deleteUser)
router.get('/:id',getUserById)
router.post("/register/google", async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
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
  });
  

module.exports = router