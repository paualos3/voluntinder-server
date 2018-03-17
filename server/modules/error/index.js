function invalidToken() {
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.message = 'Invalid Authorization token.'
    this.status = 403
    this.errorCode = 'E004'
}

function missingToken() {
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.message = 'Missing Authorization token.'
    this.status = 403
    this.errorCode = 'E005'
}

module.exports = {
    invalidToken: invalidToken,
    missingToken: missingToken,
}