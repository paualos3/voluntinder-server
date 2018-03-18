module.exports = {
    port: process.env.PORT || 3000,
    mongoDbUri: process.env.MONGODB_URI || 'mongodb://admin:voluntinder@ds213229.mlab.com:13229/voluntinder',
    enableMorgan: process.env.ENABLE_LOG_MORGAN || false,

}