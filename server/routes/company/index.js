const userModule = require('../../modules/user')
const {isAuthenticated} = require('../middleware')
const f = require('../util').wrapAsyncRouterFunction

module.exports = app => {

    app.get('/api/company', isAuthenticated, f(async function (req, res) {
        const userId = req.userId
        const user = await userModule.getProfile({userId: userId})
        res.json(user)
    }))

    //UPDATE
    app.post('/api/company', isAuthenticated, f(async function (req, res) {
        const {Name, Picture, BirthDate, ChosenGender, Biography} = req.body
        const userId = req.userId
        console.log("Name: ",Name)
        const user = await userModule.updateProfile({userId, Name, Picture, BirthDate, ChosenGender, Biography})
        res.json(user)
    }))
}
