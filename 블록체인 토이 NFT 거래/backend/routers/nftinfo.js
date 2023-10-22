const router = require("express").Router();
const { json } = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

router.post("/",async(req,res)=>{
    console.log(req.body);

    const {name, des, hash} = req.body;

    let nftjson = {
        "pinataContent": {
            name : name,
            description : des,
            image : hash,
            attributes :[
            ]
        },
        
        "pinataMetadata": {
          "name": `${name}.json`
        }
    }
    const savepath = path.join(__dirname,"..","/nftjson","nft.json")
    
    fs.writeFile(savepath,JSON.stringify(nftjson),(err)=>{

        if(err){
            console.log(err);
        }
        else{
            console.log("json 파일 생성")
            fs.readFile(savepath,async(err,data)=>{

                if(err){
                    console.log("파일 읽기 오류", err);
                }
                else {
                    const readJson = JSON.parse(data);
        
                    const resp = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", readJson,{
                        headers :{
                            "Content-type" : "application/json",
                            pinata_api_key : process.env.PINATA_API_KEY,
                            pinata_secret_api_key : process.env.PINATA_SECRET_API_KEY,
                        }
                    })
        
                    console.log(resp.data.IpfsHash);
                    res.send(resp.data.IpfsHash);
                }
            })
        }
    })
})

module.exports = router;