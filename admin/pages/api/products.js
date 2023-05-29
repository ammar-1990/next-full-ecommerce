import connectDB from "@/middleware/mongodb";
import { createError } from "@/middleware/createError";
import errorHandler from "@/middleware/errorHandler";
import { verifyToken } from "@/middleware/verifyToken.js";
import Product from "../../models/Product";
import mongoose from "mongoose";

const handler = async (req, res) => {



  if (req.method === "GET") {
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


  verifyToken(req, res);
  if(req.method === "PUT"){
console.log('GET')
    const id = req.query.id;
    const { name, desc, price, cat, features } = req.body;
    if (!name || !desc || !price || !cat)
      return errorHandler(createError(409, "enter all informations"), req, res);

      try {
     
        const product = await Product.findByIdAndUpdate(id,{ name, desc, price, cat, features },{new:true});
        if(!product)
        return errorHandler(createError(404, "no such product"), req, res);
      return  res.status(201).json(product);
      } catch (error) {
        errorHandler(error, req, res);
      }

  }

if(req.method==="POST")
  {
console.log('post')
    const { name, desc, price, cat, features } = req.body;
  if (!name || !desc || !price || !cat)
    return errorHandler(createError(409, "enter all informations"), req, res);

  try {
    const product = await Product.create({ name, desc, price, cat, features });
    res.status(201).json(product);
  } catch (error) {
    errorHandler(error, req, res);
  }}


  if(req.method==="DELETE"){
   
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
