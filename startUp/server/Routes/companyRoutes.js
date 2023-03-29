const router = require('express').Router()
const {getCompanies,addCompany,updateCompanyInfo,deleteCompany,getCompanyById} = require('../Handlers/companyHandler')
const {verifyToken} = require('../middlewares/verify')
router.get('/',verifyToken,getCompanies)
router.post('/',addCompany)
router.put('/:id',verifyToken,updateCompanyInfo)
router.delete('/:id',verifyToken,deleteCompany)
router.get('/:id',getCompanyById)


module.exports = router