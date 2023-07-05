import express from "express";
import  json  from "body-parser";

const router = express.Router(); 

import {usermodel} from "../models/User.js";




router.post("/", async(req,res)=>{

     const newUser = new usermodel(req.body);
     try{

         await newUser.save();
         res.status(200).json({
          "message":"user was inserted successfuly"
     })
     }catch{
          res.status(500).json({

               "message": "user was not inserted successfully"
          })

     }

});



export default router;