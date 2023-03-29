const router = require('express').Router()
const {getUsers,register,loginUser,updateUserInfo,deleteUser} = require('../Handlers/userHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getUsers)
router.post('/register',register)
router.post('/login',loginUser)
router.put('/:id',updateUserInfo)
router.delete('/:id',deleteUser)

module.exports = router