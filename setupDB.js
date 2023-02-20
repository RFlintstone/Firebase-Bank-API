function initFirestore() {
    // Firebase Admin configuration
    const serviceAccount = require('./project34-e8021-6ca1bf104b65.json');
    const admin = require("firebase-admin");
    const adminConfig = {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://project34-e8021.firebaseio.com'
    };

    // Initialize Firebase Admin
    admin.initializeApp(adminConfig);
}

module.exports = {
    initFirestore,
};