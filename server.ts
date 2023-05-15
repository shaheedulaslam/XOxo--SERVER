import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http'
import cors from 'cors'
import { Router } from './Router/user';
import { Server } from 'socket.io';


dotenv.config()
const app = express();


mongoose.connect(process.env.MONGO_URL as string)
const db = mongoose.connection
db.on('error',error =>console.log(error))
db.once('open',()=>console.log('database connected'));


app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
console.log("User Connected",socket.id);

socket.on("join_room",(data)=>{
    socket.join(data)
    console.log(`User with ID :${socket.id} joined room : ${data}`)
})

socket.on("disconnected",()=>{
console.log("user disconnected",socket.id);    
})
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', Router)



server.listen(process.env.PORT || 4001,()=>{
    console.log(`server connected on ${process.env.PORT}`);
    
})




