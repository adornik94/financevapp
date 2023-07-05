import express from "express";
import {KPI} from "../models/KPI.js";

const router = express.Router();


router.post("/", async (req,res)=>{

try{
    const newKpi = new KPI(req.body);

    await newKpi.save();
    res.status(200).json({
     "message":"kpi was inserted successfuly"
})

}catch{
 
    res.status(500).json({

        "message": "kpi was not inserted successfully"
   })

     

}




});



router.get("/", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;