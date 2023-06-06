import errorHandler from "./errorHandler"
import { createError } from "./createError"
import jwt from 'jsonwebtoken'

export const verifyToken = async(req,res)=>{
const token = req.cookies.accessToken
if(!token) return errorHandler(createError(401,"not authorized"),req,res)

jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{

    if(err) return errorHandler(err,req,res)

    req.user = user
    console.log(user)

})

}