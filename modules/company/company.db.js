const {getCollection, collectionNames, generateNextId} = require('../db')
const collection = () => getCollection(collectionNames.company)
const getNextId = () => generateNextId(collectionNames.company)


async function get(token) {
    console.log(token)
    const query = {
        token: token
    }
    console.log(query)
    return await collection().findOne(query)
}

async function getCompany({companyId}) {
    const query = {
        id: String.valueOf(companyId)
    }
    console.log(query)
    return await collection().findOne(query)
}

async function updateCompany({id, Name, Picture, Description}) {
    console.log("Company: ", Name)
    const query = {
        id: String.valueOf(id)
    }
    const update = {
        $set: {
            updatedDateTime: new Date()
        }
    }
    if (Name) {
        update.$set.Name = Name
    }
    if (Picture) {
        update.$set.Picture = Picture
    }
    if (Description) {
        update.$set.Description = Description
    }
    const options = {
        upsert: false,
        returnOriginal: false
    }
    console.log(update)
    return await collection().updateOne(query, update, options)
}

module.exports = {
    get: get,
    getCompany: getCompany,
    updateCompany: updateCompany,
}