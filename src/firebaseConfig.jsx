import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDNJ_Xzfazg5oj7reDD6HW20H6R-oCgP4U",
    authDomain: "task-sit-313.firebaseapp.com",
    projectId: "task-sit-313",
    storageBucket: "task-sit-313.appspot.com",
    messagingSenderId: "130413198403",
    appId: "1:130413198403:web:7468c3c21819a38e0d28f6",
    measurementId: "G-J74ZLMFJB1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
