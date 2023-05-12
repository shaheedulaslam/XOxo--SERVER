import mongoose from "mongoose";
const userSchema  = new mongoose.Schema({

username:{
    type:String,
    // required:true
},
phone:{
    type:Number,
    // required:true
}
})

export const Usermodel = mongoose.model("user",userSchema)