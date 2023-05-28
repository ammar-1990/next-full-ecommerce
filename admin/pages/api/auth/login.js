import { createError } from "@/middleware/createError";
import errorHandler from "@/middleware/errorHandler";
import User from "../../../models/User.js";
import connectDB from "@/middleware/mongodb.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next';



export const handler = async (req, res, next) => {

    const { email, password } = req.body;
console.log(email,password)
  try {
   
    if (!email || !password)
      return errorHandler(createError(404, "enter all informations"), req, res);

    const exist = await User.findOne({ email });
    if (!exist)
      return errorHandler(createError(404, "such user does not exist"), req, res);

const match = bcrypt.compareSync(password,exist.password)
if(!match)   return errorHandler(createError(404, "invalid credintials"), req, res);


    

    const token = jwt.sign({userId:exist._id,username:exist.username,email:exist,email},process.env.JWT_SECRET)
    const { password:secret, ...info } = exist._doc;

    setCookie('accessToken', token, { req, res, maxAge: 60 * 60 * 24,httpOnly:true,secure:true,sameSite:'none' });
   
  
    res.status(200).json(info);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default connectDB(handler);