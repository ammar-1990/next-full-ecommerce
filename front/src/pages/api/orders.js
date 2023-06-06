import connectDB from "@/middlewares/mongodb"
import errorHandler from "@/middlewares/errorHandler"
import { createError } from "@/middlewares/createError"
import Order from '../../models/order'
import { verifyToken } from "@/middlewares/verifyToken"





const handler = async(req,res)=>{
console.log(req.method)

    if(req.method === 'GET')
  {
  
   
    return res.status(200).json(await Order.find().sort({createdAt:-1}))}





if(req.method==="POST"){
    const {name,email,city,postal,street,country,cart} = req.body
    console.log('post')
    console.log(cart)
    const theCart = JSON.parse(cart)
  
    
  
    if(!name || !email || !city || !postal || !street || !country || theCart===0) return errorHandler(createError(400,'enter all info'),req,res)
  
  try {
      const order = await Order.create({name,email,city,postal,street,country,cart:theCart})
      
     
      res.json(order)
  } catch (error) {
      errorHandler(error.req.res)
      console.log(error)
  }
  

}

 
 

    


}



export default connectDB(handler)