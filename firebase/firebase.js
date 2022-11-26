import app from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
            app.firestore().settings({ experimentalForceLongPolling: true });
        }
        this.db = app.firestore()
    }
}


const firebase = new Firebase();
export default firebase; 
