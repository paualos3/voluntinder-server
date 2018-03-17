const MongoClient = require('mongodb').MongoClient
const config = require('../../config')


let dbConnection = null

const collectionNames = {
    users: 'users',
    idSequence: 'id_counter',
    company: 'companyes',
    positions: 'positions',
}

const connect = () => MongoClient.connect(config.mongoDbUri)
    .then(db => dbConnection = db)
    .then(() => console.log('Successfully connected to DB'))

const getCollection = collection => {
    if (!dbConnection) {
        throw new Error('Not connected to DB')
    }
    return dbConnection.collection(collection)
}

async function generateNextId(collectionName) {
    if (!dbConnection) {
        throw new Error('Not connected to DB')
    }
    const collection = getCollection(collectionNames.idSequence)

    const query = {
        collection: collectionName
    }

    const update = {
        $inc: {
            id: 1
        }
    }

    const options = {
        upsert: true,
        returnOriginal: true
    }

    return collection
        .findOneAndUpdate(query, update, options)
        .then(response => response && response.value && response.value.id ? response.value.id : 0)
}

module.exports = {
    collectionNames: collectionNames,
    connect: connect,
    getCollection: getCollection,
}