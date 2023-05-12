import express from 'express'
export const Router = express.Router()
import { userRegister,
         otpPost,
         } from '../controllers/userController'




Router.post('/register', userRegister)
Router.post('/otp',otpPost)

