import connectDB from "@/middleware/mongodb";
import { createError } from "@/middleware/createError";
import errorHandler from "@/middleware/errorHandler";
import { verifyToken } from "@/middleware/verifyToken.js";
import Product from "../../models/Product";
import mongoose from "mongoose";

const handler = async (req, res) => {



  if (req.method === "GET") {
   
    if(req.query.category){
    
const category = req.query.category
const products = await Product.find({},null,{cat:category});

return res.status(200).json(products);
    }
    if (req.query.id) {
      const id = req.query.id;
      if (!mongoose.isValidObjectId(id))
        return errorHandler(createError(404, "not a valid id"), req, res);
      const product = await Product.findById(id);
      if (!product)
        return errorHandler(createError(404, "no such product"), req, res);
      return res.status(200).json(product);
    }
    return res.status(200).json(await Product.find());
  }


 
  if(req.method === "PUT"){
    verifyToken(req, res);
    if(req.user.email !== 'ammar1@ammar.com') return errorHandler(createError(403,'not authorized'),req,res)
    const id = req.query.id;
    const { name, desc, price, cat, features ,images} = req.body;
    if (!name || !desc || !price || !cat ||images.length===0)
      return errorHandler(createError(409, "enter all informations"), req, res);

      try {
     
        const product = await Product.findByIdAndUpdate(id,{ name, desc, price, cat, features,images },{new:true});
        if(!product)
        return errorHandler(createError(404, "no such product"), req, res);
      return  res.status(201).json(product);
      } catch (error) {
        errorHandler(error, req, res);
      }

  }

if(req.method==="POST")
  {
    console.log(req.user)
    verifyToken(req, res);
console.log('post')
    const { name, desc, price, cat, features,images } = req.body;
  if (!name || !desc || !price || !cat || images.length ===0)
    return errorHandler(createError(409, "enter all informations"), req, res);

  try {
    const product = await Product.create({ name, desc, price, cat, features,images });
    res.status(201).json(product);
  } catch (error) {
    errorHandler(error, req, res);
  }}


  if(req.method==="DELETE"){
    verifyToken(req, res);
   if(req.user.email !=='ammar1@ammar.com') return errorHandler(createError(403,'not authorized'),req,res)
    console.log('DELETE')
    const id = req.query.id;
    console.log(id)
    if (!mongoose.isValidObjectId(id))
    return errorHandler(createError(404, "not a valid id"), req, res);

    try {
        const product = await Product.findByIdAndDelete(id)

        res.status(200).json(product)
    } catch (error) {
        errorHandler(error, req, res);  
    }


  }
};

export default connectDB(handler);
