const express = require("express");
const cors = require("cors");
const dot = require("dotenv").config();
const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

const nftinfoRouter = require("./routers/nftinfo");

app.use(
    cors({
        origin : ["http://localhost:3000",],
        credentials : true,
    })
)
app.use("/nftinfo",nftinfoRouter);

app.listen(8080,()=>{
    console.log("server on");
})
