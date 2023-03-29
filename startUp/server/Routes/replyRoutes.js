const router = require('express').Router()
const {getReplies,addReply,deleteReply} = require('../Handlers/replyHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getReplies)
router.post('/',verifyToken,addReply)
router.delete('/:id',verifyToken,deleteReply)

module.exports = router