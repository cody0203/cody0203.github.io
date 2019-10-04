import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper/dist';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const studentsCollection = 'students';
const

export const webApi = functions.https.onRequest(main);

interface Student {
    name: String
    birthYear: String
    email: String
    phone: String
    created: Number
}

// Add new student
app.post('/students', async (req, res) => {
    try {
        const student: Student = {
            name: req.body['name'],
            birthYear: req.body['birthYear'],
            email: req.body['email'],
            phone: req.body['phone'],
            created: Math.round(+new Date()/1000),
        }

        const newDoc = firebaseHelper.firestore
            .createDocumentWithID(db, studentsCollection, "", student);
        res.status(201).send(`Created a new student: ${newDoc}`);
    } catch (error) {
        res.status(400).send(`Student should only contains name, birth year, email and phone!!!`)
    }        
})

// Update new student
app.put('/students/:studentId', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, studentsCollection, req.params.studentId, req.body);
    res.status(204).send(`Update a new student: ${updatedDoc}`);
})

// View a student
app.get('/students/:studentId', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, studentsCollection, req.params.studentId)
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get student: ${error}`));
})

// View all students
app.get('/students', (req, res) => {
    firebaseHelper.firestore
        .backup(db, studentsCollection)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get students: ${error}`));
})

// Delete a student 
app.delete('/students/:studentId', async (req, res) => {
    const deleteStudent = await firebaseHelper.firestore
        .deleteDocument(db, studentsCollection, req.params.studentId);
    res.status(204).send(`Student is deleted: ${deleteStudent}`);
})

export { app };
