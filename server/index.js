import express from "express";
import bodyParser from  "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import  userRouter from "./routes/userRouter.js";
import  kpiRouter from "./routes/kpiRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import {Product} from "./models/Product.js";
import { MongoClient, ServerApiVersion } from 'mongodb';







dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());




app.use(morgan("common")); 
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false})); 



app.use(cors());

console.log("hello ");



const uri2 = "mongodb+srv://andjelador994:XRH1EMl6x0EQjmN7@cluster4.zbhjijq.mongodb.net/?retryWrites=true&w=majority";

const uri3 = "mongodb+srv://andjelador994:U2In2lZrFyztzJmN@cluster0.r0xrzqd.mongodb.net/?retryWrites=true&w=majority";


const uri4 ="mongodb+srv://andjelador994:Oy2rGtPSd8QeHfGd@cluster0.297ykqf.mongodb.net/?retryWrites=true&w=majority"

app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin" }));

app.listen(process.env.PORT,()=>console.log(`Server is strating on port ${process.env.PORT}`));

async function  connect(){

   try{
   await mongoose.connect(uri4,{useNewUrlParser: true,useUnifiedTopology:true});
  console.log("Connection successfull");
   }catch{

    console.log("conection unsuccessfull");
   }


}


 connect();

app.use("/kpis",kpiRouter);
app.use("/products",productRoutes);
app.use("/transaction",transactionRoutes);


console.log("another hello");