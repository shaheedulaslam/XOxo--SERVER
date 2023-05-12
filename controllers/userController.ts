import  Express  from "express"
import { Usermodel } from "../models/userModel"
import { confirmOtp, sentOtp} from "../helpers/twilio"



export const userRegister = async(req:Express.Request,res:Express.Response)=>{
    try {
    const phonenum:number = req.body.phone
    const userExist:any = await Usermodel.findOne({phone:phonenum})
    if(userExist){
     return res.status(422).json({ error: 'This User is already Exist' })
    }
    sentOtp(phonenum)
    res.status(200).json({result:"Otp send"})
    } catch (error) {
    console.log(error);
    }
}

export const otpPost = async(req:Express.Request,res:Express.Response)=>{
    try {
    const username =  req.body.username
    const otp = req.body.otp
    const phone = req.body.phone
    console.log(username,otp,phone);
    

    const result = `${otp}@${phone}`
    const [otpNum, phoneNum] = result.split("@").map(Number)
    console.log(otpNum,phoneNum);
    const token:any = await confirmOtp(otpNum,phoneNum)
    console.log(token,otp,otp === token);

    if(token === 'approved'){
    const userCreate:any = await new Usermodel({
        username:username,
        phone:phone
    }).save()
    console.log(userCreate);
    res.status(201).json({result:"User Created"})
    }else{
    res.status(400).json({error:"Invalid Otp"})
    }
    } catch (error) {
    console.log(error);
    }
}
