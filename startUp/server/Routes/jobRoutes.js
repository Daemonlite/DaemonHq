const router = require('express').Router()
const {getJobs,addJobs,updateJobPost,deleteJob} = require('../Handlers/jobHandler')
const {verifyToken} = require('../middlewares/verify')

router.get('/',verifyToken,getJobs)
router.post('/',verifyToken,addJobs)
router.put('/:id',verifyToken,updateJobPost)
router.delete('/:id',verifyToken,deleteJob)

module.exports = router