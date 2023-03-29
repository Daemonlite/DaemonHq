const router = require('express').Router()
const {getListings,createListing,deleteListing,getListingsById} = require('../Handlers/listingHandlers')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getListings)
router.post('/',verifyToken,createListing)
router.delete('/:id',verifyToken,deleteListing)
router.get('/:id',getListingsById)

module.exports = router