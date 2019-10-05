import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper/dist';
import * as express from 'express';
import * as bodyParser from "body-parser";
const cors = require('cors');

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

app.use(cors({ corsOptions }));
main.use(cors({ corsOptions }));

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const studentsCollection = 'students';

export const webApi = functions.https.onRequest(main);

interface Student {
    name: String
    birthYear: String
    email: String
    phone: String
    created: Number
}

// Add new student
app.post('/students', cors(corsOptions), async (req, res) => {
    try {
        const student: Student = {
            name: req.body['name'],
            birthYear: req.body['birthYear'],
            email: req.body['email'],
            phone: req.body['phone'],
            created: Math.round(+new Date() / 1000),
        }

        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, studentsCollection, student);
        res.status(201).send(`Created a new student: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Student should only contains name, birth year, email and phone!!!`)
    }
})

// Update new student
app.put('/students/:studentId', cors(corsOptions), async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, studentsCollection, req.params.studentId, req.body);
    res.status(204).send(`Update a new student: ${updatedDoc}`);
})

// View a student
app.get('/students/:studentId', cors(corsOptions), (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, studentsCollection, req.params.studentId)
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get student: ${error}`));
})

// View all students
app.get('/students', cors(corsOptions), (req, res) => {
    firebaseHelper.firestore
        .backup(db, studentsCollection)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get students: ${error}`));
})

// Delete a student 
app.delete('/students/:studentId', cors(corsOptions), async (req, res) => {
    const deleteStudent = await firebaseHelper.firestore
        .deleteDocument(db, studentsCollection, req.params.studentId);
    res.status(204).send(`Student is deleted: ${deleteStudent}`);
})

export { app };
