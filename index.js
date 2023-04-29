const express = require("express")
const morgan = require("morgan")
require("dotenv").config();
const app = express();

PORT = process.env.PORT
const adminrouter = require("./router/admin")
const all_blogrouter = require("./router/allblog")
const category_blogrouter = require("./router/category")
const search_router = require("./router/user")
const bodyParser = require("body-parser");
const connect_db = require("./DB/connect")
const { search } = require("./router/allblog");
const favicon = require('serve-favicon');

//middelware
app.use("/",express.static("uploads"))
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(favicon(__dirname + '/blog.ico'));

//all routes
app.use("/admin", adminrouter);
app.use("/all_blog",all_blogrouter);
app.use("/category",category_blogrouter);
app.use("/user",search_router)


//cores handling
app.use((req, res, next) => {
    res.render("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", "PUT ,PATCH,POST,GET,DELETE")
        return res.status(200).json({});
    }
})


//Error handling
app.use((req, res, next) => {
    const error = new Error("not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

const start =async ()=>{
    try {
        //connect database
        await connect_db;
        app.listen(PORT ,()=>{
            console.log(`listening on ${PORT} port...`);
        })
        
    } catch (error) {
        console.log(error);
    }
}
start();