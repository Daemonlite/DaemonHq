const router = require('express').Router()
const {getUsers,register,loginUser,updateUserInfo,deleteUser,getUserById,googleRegistration} = require('../Handlers/userHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getUsers)
router.post('/register',register)
router.post('/login',loginUser)
router.put('/:id',updateUserInfo)
router.delete('/:id',deleteUser)
router.get('/:id',getUserById)
router.post("/register/google",googleRegistration);
  

module.exports = router