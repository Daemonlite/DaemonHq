const router = require('express').Router()
const {getBids,placeBid,withdrawBid,getBidById,updateBid} = require('../Handlers/bidHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getBids)
router.post('/',verifyToken,placeBid)
router.delete('/:id',verifyToken,withdrawBid)
router.get('/:id',getBidById)
router.put('/:id',updateBid)

module.exports = router