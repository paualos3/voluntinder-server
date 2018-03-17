const userModule = require('../modules/user')
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

    const user = await userModule.get(authorizationToken)

    if (!user) {
        return next(new errors.invalidToken())
    }

    req.userId = user.id

    logRequest(req)

    return next()
}

module.exports = {
    isAuthenticated: isAuthenticated,
}