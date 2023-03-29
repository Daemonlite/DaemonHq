const router = require('express').Router()
const {getBids,placeBid,withdrawBid,getBidsById,updateBid} = require('../Handlers/bidHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getBids)
router.post('/',verifyToken,placeBid)
router.delete('/:id',verifyToken,withdrawBid)
router.get('/:id',getBidsById)
router.put('/:id',updateBid)

module.exports = router