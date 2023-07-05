import mongoose from "mongoose";




const TransactionSchema = mongoose.Schema(
    {
       buyer: {

          type:String

       }, 
       amount:{
       type:String


       }, 
       productIds:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
       }
       ]
  
 } );
  
  export const Transaction = mongoose.model("Transaction", TransactionSchema)