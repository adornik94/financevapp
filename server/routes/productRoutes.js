import express from "express";

import {Product} from "../models/Product.js";

const router = express.Router();





router.post("/", async (req,res)=>{

try{
    const newproduct = new Product(req.body);

    await newproduct.save();
    res.status(200).json({
     "message":"kpi was inserted successfuly"
})

}catch{
 
    res.status(500).json({

        "message": "kpi was not inserted successfully"
   })

     

}




});



router.get("/", async (req,res)=>{

   try{

    const products = await Product.find();
    res.status(200).json(products);

   }catch(error){
     
    res.status(404).json({message: error.message});
   }

});



export default router;