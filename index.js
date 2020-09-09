const express = require("express")
const app = express()
const port = process.env.PORT || 3002
app.listen(port, function () {
    console.log(`${port}`)
})
app.use(express.static("public"))
app.use(express.json())
require('dotenv').config()

const MongoClient = require("mongodb").MongoClient
const uri = process.env.uri_key;

const Clients = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let snakedb

Clients.connect(error => {
    if (error) {
        console.error(error)
    }
    snakedb = Clients.db("snakedb")
})
app.get("/sendtoclient", function (request, response) {
    snakedb.collection("scores").find({}).sort({
        score: -1
    }).toArray((error, element) => {
        if (error) {
            console.log(error)
        }
        response.json(element)
    })
})


app.post("/api", (request, response) => {
    snakedb.collection("scores").insertOne(request.body)
    response.end()
})