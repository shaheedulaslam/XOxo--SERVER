import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import { Router } from './Router/user';


dotenv.config()
const app = express();


mongoose.connect(process.env.MONGO_URL as string)
const db = mongoose.connection
db.on('error',error =>console.log(error))
db.once('open',()=>console.log('database connected'));



app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/', Router)



app.listen(process.env.PORT || 4001,()=>{
    console.log(`server connected on ${process.env.PORT}`);
    
})




