import mongoose from "mongoose";


const User = mongoose.Schema({


    name: {
      type:String, 
      required: true

    }, 
    email:{

        type:String, 
        required:true
    }, 
    password: {

        type:String, 
        required:true
    }

})


export const usermodel = mongoose.model("User",User);

