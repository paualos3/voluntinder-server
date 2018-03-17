const config = require('../../config')
const db = require('./position.db.js')

module.exports = {
    get: db.get,
    getPosition: db.getPosition,
    getPositionNear: db.getPositionNear,
    updateProfile: db.updatePosition,
}