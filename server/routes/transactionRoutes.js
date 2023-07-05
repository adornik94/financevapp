import express from "express";

import { Transaction } from "../models/Transaction.js";


const router = express.Router();



router.post("/",async (req,res)=>{

 try{
    
    const newTransaction = new Transaction(req.body); 
    await newTransaction.save();
    res.status(200).json({"message": "transaction inserted"})


 }catch{

    res.status(500).json({"message": "transaction not inserted"});
 }

})

router.get("/",async (req,res)=>{

   try{
    
    const transactions =  await Transaction.find();

     res.status(200).json(transactions)
   }catch(error){
     
    res.status(500).json({message: error.message})

   }



})

export default router;