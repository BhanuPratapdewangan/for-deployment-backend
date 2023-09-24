// import { MongoClient as Mongodb } from "mongodb";
// import express, { urlencoded } from "express";
// import cors from "cors";

// const connString = "mongodb+srv://bhanupratap04123:x4R6GBn5upv6KG5f@cluster0.n0j3tzk.mongodb.net/?retryWrites=true&w=majority";

// const app = express();
// const port = process.env.PORT || 3600;

// app.use(urlencoded({extended:true}));
// app.use(express.json());
// app.use(cors());

// app.get('/users', (req, res) => {

//     Mongodb.connect(connString).then(clientObject => {

//         var database = clientObject.db("for-deployment");
//         database.collection("users").find({}).toArray().then(document => {
//             res.send(document);
//             res.end();
//         })
//     })
// })


// app.get('/signin', (req, res) => {

//     Mongodb.connect(connString).then(clientObject => {

//         var database = clientObject.db("for-deployment");
//         database.collection("users").find({}).toArray().then(document => {
//             res.send(document);
//             res.end();
//         })
//     })
// })


// app.post('/signup' , (req, res) => {

//     var data = {
//         UserId : req.body.UserId,
//         UserName : req.body.UserName,
//         Password : req.body.Password,
//         Age : req.body.Age,
//         Email : req.body.Email,
//         Mobile : req.body.Mobile
//     }

//     Mongodb.connect(connString).then(clientObject => {

//         var database = clientObject.db("for-deployment");
//         database.collection("users").insertOne(data).then(document => {
//             res.send(document);
//             res.end();
//         })
//     })
// })

// app.connect((req, res) => {
//     res.writeHead(200, {"Content-Type":"application/json"});
//     res.end();
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })


import express from "express";
import cors from 'cors';

//import js files
import { } from './db/config.js';
import userModel from "./db/user.js";

const app = express();
const port = process.env.PORT || 3600;

//Middleware

app.use(express.json());
app.use(cors());


app.get('/users', async(req, res) => {

    let data = await userModel.find({});
    if (data) {
        res.send(data);
        res.end();
    } else {
        res.send("Data not found");
    }
})

//SignUp Route
app.post('/signup', async(req, res) => {
    try {
        let data = new userModel(req.body);
        data = await data.save();
        data = data.toObject();
        delete data.Password;
        res.send(data);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//SignIn Route
app.get('/signin', (req, res) => {

    if (req.body.UserId && req.body.Password) {

        let data = userModel.findOne(req.body).select('-Password');

        if (data) {
            res.send(data);
            res.end();
        } else {
            res.send("Data not found");
        }
    }
});

//Listen server in port number 3600
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


