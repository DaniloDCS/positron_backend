const firebase = require("firebase")

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID 
};

firebase.initializeApp(firebaseConfig);

module.exports.SignUpWithEmailAndPassword = (displayname, email, password, phoneNumber) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: displayname,
            phoneNumber: phoneNumber
        })
           
        return JSON.stringify(user)
    })
    .catch(error => {
        var code = error.code
        var message = error.message
        
        if (code == 'auth/weak-password') {
            return { err: 'The password is too weak.' }
        } else {
            return { err: message }
        }
        
        return { err: error }
    })
}

module.exports.SignInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            var code = error.code
            var message = error.message

            if (code == 'auth/wrong-password') {
                return { err: 'The password is too weak.' }
            } else {
                return { err: message }
            }

            return { err: error }
        })
}

return module.exports;