var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");


var connectionString = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>library - API</h1>");
});

app.get("/books", (req, res) => {
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("Books").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});


app.get("/books/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("Books").find({ ID: id }).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

app.get("/check/catogeries", (req, res) => {
    console.log("hellooooooo")
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("Books").distinct("Genre").then(documents => {
            res.send(documents);
            res.end();
        })

    })
});

app.get("/books/genre/:genre", (req, res) => {
    var genre = req.params.genre;
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("Books").find({ Genre: genre }).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});


app.get("/users", (req, res) => {
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

app.get("/adminUsers", (req, res) => {
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("adminUsers").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        })
    })
});

app.post("/register", (req, res) => {

    var user = {
        "EmailId": req.body.EmailId,
        "UserName": req.body.UserName,
        "Password": req.body.Password,
        "MobileNum": req.body.MobileNum

    };
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("users").insertOne(user).then(
            console.log("user registered")
        )
    })
});

app.post("/addBook", (req, res) => {

    var book = {

        "ID": req.body.ID,
        "title": req.body.title,
        "image": req.body.image,
        "Genre": req.body.Genre,
        "description": req.body.description,
        "rating": {
            "rate": req.body.rating ? req.body.rating.rate : req.body.rate,
            "count": req.body.rating ? req.body.rating.count : req.body.count
        }

    };
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("Books").insertOne(book).then(
            console.log("book added")
        )
    })
});

app.put("/editBook/:ID", (req, res) => {
    var ID = parseInt(req.params.ID);
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("Books").updateOne({ ID: ID }, {
            $set: {
                ID: req.body.ID,
                title: req.body.title,
                image: req.body.image,
                Genre: req.body.Genre,
                description: req.body.description,
                rating: {
                    rate: req.body.rating ? req.body.rating.rate : req.body.rate,
                    count: req.body.rating ? req.body.rating.count : req.body.count
                }
            }
        }).then(() => {
            console.log("Book Updated Successfully..");
            res.end();
        })
    })
});

app.delete("/deleteBook/:ID", (req, res)=>{
    var ID = parseInt(req.params.ID);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("LibraryManagement");
        database.collection("Books").deleteOne({ID: ID}).then(()=>{
            console.log("Book Deleted Successfully..");
            res.end();
        })
    })
});


app.post("/cartItems", (req, res) => {

    var book = {
        "userName":req.body.userName,
        "ID" : req.body.ID,
        "title": req.body.title,
        "image": req.body.image,
        "Genre": req.body.Genre

    };
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("cartItems").insertOne(book).then(
            console.log("book added to cart")
        )
    })
});


app.get("/getCartItems/:userName", (req, res) => {
    var userName = (req.params.userName);
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("cartItems").find({userName : userName }).toArray().then(documents => {
            res.send(documents);
        })
    })
});

app.get("/cartItemsNumber/:userName", (req, res) => {
    var userName = (req.params.userName);
    mongoClient.connect(connectionString).then(clientObject => {
        var database = clientObject.db("LibraryManagement");
        database.collection("cartItems").find({ userName: userName }).count().then(count => {
            res.send({count});
        })
    })
});

app.delete("/cartDeleteBook/:ID", (req, res)=>{
    var ID = parseInt(req.params.ID);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("LibraryManagement");
        database.collection("cartItems").deleteOne({ID: ID}).then(()=>{
            console.log("Book Deleted Successfully..");
            res.end();
        })
    })
});



app.listen(4000);

console.log(`server started : http://127.0.0.1:4000`)


