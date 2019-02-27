import { initializeApp } from 'firebase';



const app = initializeApp({
    apiKey: "AIzaSyBD5MtiAR3tmQoUXYE7FLWRIwtqaN_Bw7Y",
    authDomain: "test-581d6.firebaseapp.com",
    databaseURL: "https://test-581d6.firebaseio.com",
    projectId: "test-581d6",
    storageBucket: "test-581d6.appspot.com",
    messagingSenderId: "121221885821"
})



export const db = app.database();
export const authentication = app.auth();
export const dataref = db.ref('Data');
export const branchref = db.ref('Data/0/Branch');
export const productref = db.ref('Data/1/Product');
export const itemsref = db.ref('Data/2/Items');
export const usersref = db.ref('Data/3/Users');