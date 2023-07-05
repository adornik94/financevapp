import mongoose from "mongoose";




const ProductSchema = mongoose.Schema(
    {
       price: {type: String}
      ,
       expense: {  type:String },
      transactions: [

        {
            type: mongoose.Schema.Types.ObjectId,
             ref:"Transaction"
        }
      ]
  
 } );
  
  export const Product = mongoose.model("Product", ProductSchema);