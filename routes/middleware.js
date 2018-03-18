const userModule = require('../modules/user')
const companyModule = require('../modules/company')
const errors = require('../modules/error')

function logRequest(req) {
    console.log(`Request - ${JSON.stringify({
        method: req.method,
        requestId: req.headers['x-request-id'],
        username: req.userid,
        url: req.url,
        body: req.body,
    }, null, 4)}`)
}

async function isAuthenticated(req, res, next) {
    console.log(req.headers.authorization)
    const authorizationToken = req.headers.authorization
    console.log(authorizationToken)

    if (!authorizationToken) {
        return next(new errors.missingToken())
    }

    var user = await userModule.get(authorizationToken)

    if (!user) {
        user = await companyModule.get()
        return next(new errors.invalidToken())
    }

    req.userId = user.id

    logRequest(req)

    return next()
}

module.exports = {
    isAuthenticated: isAuthenticated,
}