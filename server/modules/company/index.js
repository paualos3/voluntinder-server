const config = require('../../config')
const db = require('./company.db.js')

module.exports = {
    get: db.get,
    getCompany: db.getCompany,
    updateCompany: db.updateCompany,
}