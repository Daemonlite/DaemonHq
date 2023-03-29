const router = require('express').Router()
const {getMails,addMail,sendMail,deleteMail} = require('../Handlers/newsLetter')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getMails)
router.post('/',verifyToken,addMail)
router.post('/send',verifyToken,sendMail)
router.delete('/:id',verifyToken,deleteMail)

module.exports = router