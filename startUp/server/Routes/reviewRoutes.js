const router = require('express').Router()
const {getRatings,addRating,deleteRating} = require('../Handlers/reviewHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getRatings)
router.post('/',verifyToken,addRating)
router.delete ('/:id',verifyToken,deleteRating)

module.exports = router