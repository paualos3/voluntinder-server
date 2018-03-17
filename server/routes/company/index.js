const companyModule = require('../../modules/company')
const {isAuthenticated} = require('../middleware')
const f = require('../util').wrapAsyncRouterFunction

module.exports = app => {

    app.get('/api/company', isAuthenticated, f(async function (req, res) {
        const companyId = req.userId
        const company = await companyModule.getCompany({companyId})
        res.json(company)
    }))

    //UPDATE
    app.post('/api/company', isAuthenticated, f(async function (req, res) {
        const {Description} = req.body
        const Name = req.Name
        console.log("Company : ",Name)
        const user = await companyModule.updateCompany({Name, Description})
        res.json(user)
    }))
}
