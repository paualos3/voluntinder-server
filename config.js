module.exports = {
    port: process.env.PORT || 3000,
    mongoDbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/voluntinder',
    enableMorgan: process.env.ENABLE_LOG_MORGAN || false,

}