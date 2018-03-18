const {getCollection, collectionNames, generateNextId} = require('../db/index')
const collection = () => getCollection(collectionNames.users)
const getNextId = () => generateNextId(collectionNames.users)


async function get(token) {
    console.log(token)
    const query = {
        token: token
    }
    console.log(query)
    return await collection().findOne(query)
}

async function getProfile({userId}) {
    const query = {
        id: userId
    }
    console.log(query)
    return collection().findOne(query)
}

async function updateProfile({userId, Name, Picture, BirthDate, ChosenGender, Biography}) {
    console.log("Name: ", Name)
    const query = {
        id: userId
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
    if (BirthDate) {
        update.$set.BirthDate = BirthDate
    }
    if (ChosenGender) {
        update.$set.ChosenGender = ChosenGender
    }
    if (Biography) {
        update.$set.Biography = Biography
    }

    const options = {
        upsert: false,
        returnOriginal: false
    }

    console.log(update)
    return collection().updateOne(query, update, options)
}

module.exports = {
    get: get,
    getProfile: getProfile,
    updateProfile: updateProfile,
}