const config = require('../../config')
const db = require('./position.db.js')

module.exports = {
    get: db.get,
    updateProfile: db.updatePosition,
}