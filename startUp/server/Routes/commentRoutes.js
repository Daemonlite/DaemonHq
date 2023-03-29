const router = require('express').Router()
const {getComments,addComment,deleteComment} = require('../Handlers/commentHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getComments)
router.post('/',verifyToken,addComment)
router.delete('/:id',verifyToken,deleteComment)

module.exports = router