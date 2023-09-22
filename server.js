import { MongoClient as Mongodb } from "mongodb";
import express, { urlencoded } from "express";
import cors from "cors";

const connString = "mongodb+srv://bhanupratap04123:XJpEjooT2G10zAth@cluster0.n0j3tzk.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const port = process.env.PORT || 3800;

app.use(urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get('/users', (req, res) => {

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("for-deployment");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})


app.get('/signin', (req, res) => {

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("for-deployment");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })
})


app.post('/signup' , (req, res) => {
    
    var data = {
        UserId : req.body.UserId,
        UserName : req.body.UserName,
        Password : req.body.Password,
        Age : req.body.Age,
        Email : req.body.Email,
        Mobile : req.body.Mobile
    }

    Mongodb.connect(connString).then(clientObject => {

        var database = clientObject.db("for-deployment");
        database.collection("users").insertOne(data).then(document => {
            res.send(document);
            res.end();
        })
    })
})

app.connect((req, res) => {
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})