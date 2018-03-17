const positionModule = require('../../modules/position')
const {isAuthenticated} = require('../middleware')
const f = require('../util').wrapAsyncRouterFunction

module.exports = app => {

    app.get('/api/position', isAuthenticated, f(async function (req, res) {
        const positionId = req.params.ID
        var position;
        if (positionId) {
            position = await positionModule.getPosition({ID: positionId})
        } else {
            position = await positionModule.get()
        }
        res.json(position)
    }))

    //UPDATE
    app.post('/api/position', isAuthenticated, f(async function (req, res) {
        const {ID, Uri, CompanyName, Name, Description, Duration} = req.body
        const user = await positionModule.updatePosition({ID, Uri, CompanyName, Name, Description, Duration})
        res.json(user)
    }))
}
