const {getCollection, collectionNames, generateNextId} = require('../db')
const collection = () => getCollection(collectionNames.positions)
const getNextId = () => generateNextId(collectionNames.positions)


async function get() {
    /*const query = {
        token: token
    }
    console.log(query)*/
    return await collection().find({},{_id: 0}).toArray()
}

async function getPositionNear({coordinates, distance}) {
    console.log("Distance: ", distance)
    console.log("Coordinates: ", coordinates)
    collection().createIndex({"loc":"2dsphere"});
    return await collection().find({
        loc :{
            $near : {
                $geometry : {
                    index : "Point" ,
                    coordinates : coordinates
                },
                $maxDistance : parseFloat(distance)
            }
        }
    }).toArray()

}

async function getPosition({ID}) {
    console.log(ID)
    const query = {
        ID: ID
    }
    console.log(query)
    return await collection().findOne(query, {_id: 0})
}

async function updatePosition({ID, Uri, CompanyName, Name, Description, Duration}) {
    if (ID) {
        const query = {
            ID: ID
        }
        const update = {
            $set: {
                updatedDateTime: new Date()
            }
        }
        if (Name) {
            update.$set.Name = Name
        }
        if (Uri) {
            update.$set.Uri = Uri
        }
        if (CompanyName) {
            update.$set.CompanyName = CompanyName
        }
        if (ChosenGender) {
            update.$set.Description = Description
        }

        if (Duration) {
            update.$set.Duration = Duration
        }

        const options = {
            upsert: false,
            returnOriginal: false
        }

        console.log(update)
        return collection().updateOne(query, update, options)
    } else {
        ID = getNextId()
        const position = {
            ID: ID,
            Name: Name,
            Uri: Uri,
            CompanyName: CompanyName,
            Description: Description,
            Duration: Duration
        }
        return collectio().inert(position)
    }
}

module.exports = {
    get: get,
    getPositionNear: getPositionNear,
    getPosition: getPosition,
    updatePosition: updatePosition,
}