const admin = require('firebase-admin');
let db; // Variable for our database reference

function newReference() {
    // Get the (new) reference to the Firestore database
    db = admin.firestore();
}

async function fetchData(collection, orderBy, direction) {
    // Make sure we have the right reference
    newReference();

    // Get a reference to the "data" collection with an optional filter
    let dataCollection;
    if (orderBy !== undefined && direction !== undefined) {
        dataCollection = db.collection(collection).orderBy(orderBy, direction);
    } else {
        dataCollection = db.collection(collection);
    }

    // Get all documents in the "data" collection
    const dataQuery = await dataCollection.get();

    // Map the documents to their data objects
    return dataQuery.docs.map((doc) => doc.data());
}

async function fetchDataByParam(collection, paramId, paramField) {
    // Make sure we have the right reference
    newReference();

    // Get a specific document from 'data' based on the passed id.
    const Ref = db.collection(collection).doc(paramId);
    const doc = await Ref.get();

    // Put our data in the variable so we can return it easily
    let res;
    if (doc.exists && doc.data()[paramField] !== undefined) {
        res = {data: doc.data()[paramField]}
    } else {
        res = {data: 'null'}
    }

    return res;
}

async function fetchDataByWhere(collection, paramId, operator, paramField) {
    // Make sure we have the right reference
    newReference();

    // Get a specific document from 'data' based on the passed id.
    const Ref = db.collection(collection);
    const snapshot = await Ref.where(paramId, operator, paramField).get();

    // Put our data in the variable so we can return it easily
    let res = [];
    if (!snapshot.empty) {
        snapshot.forEach(doc => {
            res.push(doc.data());
        });
    } else {
        res = {data: 'null'}
    }

    return res;
}

module.exports = {
    fetchData,
    fetchDataByParam,
    fetchDataByWhere
};