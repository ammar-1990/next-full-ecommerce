import { createError } from "@/middleware/createError";
import errorHandler from "@/middleware/errorHandler";
import User from "../../../models/User.js";
import connectDB from "@/middleware/mongodb.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { setCookie } from 'cookies-next';



export const handler = async (req, res, next) => {

    const { username, email, password } = req.body;

  try {
   
    if (!username || !email || !password)
      return errorHandler(createError(404, "enter all informations"), req, res);

    const exist = await User.findOne({ email });
    if (exist)
      return errorHandler(createError(404, "user already exists"), req, res);

const hash = bcrypt.hashSync(password,5)


    const user = await User.create({ username,email,password:hash });

    const token = jwt.sign({userId:user._id,username:user.username,email:user,email},process.env.JWT_SECRET)
    const { password:secret, ...info } = user._doc;

    setCookie('accessToken', token, { req, res, maxAge: 60 * 60 * 24,httpOnly:true,secure:true,sameSite:'none' });
   
  
    res.status(200).json(info);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default connectDB(handler);
