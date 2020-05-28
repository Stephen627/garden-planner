import * as firebase from 'firebase/app';
import 'firebase/analytics';

const config = require('../../config');

firebase.initializeApp({
    apiKey: config['firebase-api-key'],
    authDomain: "garden-planner-284e2.firebaseapp.com",
    databaseURL: "https://garden-planner-284e2.firebaseio.com",
    projectId: "garden-planner-284e2",
    storageBucket: "garden-planner-284e2.appspot.com",
    messagingSenderId: "340578650200",
    appId: "1:340578650200:web:5bc99011f18b5f4cd4e22d",
    measurementId: "G-W1QESN3YYR"
});
firebase.analytics();