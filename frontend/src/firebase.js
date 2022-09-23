import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDIB9qUX2q9_Dc2FzG-DHxgsLhdhEA2bqQ",
    authDomain: "connections-2b9ea.firebaseapp.com",
    projectId: "connections-2b9ea",
    storageBucket: "connections-2b9ea.appspot.com",
    messagingSenderId: "210034669592",
    appId: "1:210034669592:web:4baf3d76a57d3fb57c6b6d",
    measurementId: "G-FPB50QLBPG"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://connections-2b9ea.appspot.com");

export default storage;
