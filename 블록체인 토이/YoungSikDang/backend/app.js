const dot = require("dotenv").config();
const {sequelize} = require("./models");
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const insertMenuRouter = require("./routers/insert");
const getMenuRouter = require("./routers/getmenu");
app.use(express.urlencoded({extended : false}));

app.use(
    cors({
        origin : ["http://localhost:8080",'http://localhost:3000'],
        credentials: true,
}))

sequelize
.sync({force : false})
.then(()=>{
    console.log("database connect")
})
.catch((err)=>{
    console.log(err);
});

app.use('/', insertMenuRouter);
app.use('/',getMenuRouter);

app.use("/menu_img", express.static(path.join(__dirname, "imgs", "menuimg")));


app.listen(8080, ()=>{
    console.log("Server on");
})