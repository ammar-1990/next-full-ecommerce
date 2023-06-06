import connectDB from "@/middleware/mongodb"
import { verifyToken } from "@/middleware/verifyToken"
import { createError } from "@/middleware/createError";
import errorHandler from "@/middleware/errorHandler";
import Category from "@/models/Category";

 const handler = async(req,res)=>{

if(req.method==="GET"){

try {
    const cats = await Category.find()

    res.status(200).json(cats)
    
} catch (error) {
    errorHandler(error,req,res)
}
}





if(req.method==='POST'){
console.log(req.body)
    verifyToken(req,res)
if(!req.body) return errorHandler(createError(404,'enter valid category'),req,res)

try {
    const exist = await Category.findOne({name:req.body.name})
    if (exist) return errorHandler(createError(404,'category already exists'),req,res)
   

  const category =  await Category.create(req.body)

    res.status(201).json(category)
} catch (error) {
    errorHandler(error,req,res)
}


}


if(req.method === "PUT"){

    verifyToken(req,res)
    if(req.user.email !=='ammar1@ammar.com') return errorHandler(createError(403,'not authorized'),req,res)

    const {name,parentCategory,id} = req.body

    if(!name) return errorHandler(createError(404,'enter all informations'),req,res)
try {
    const cat =await  Category.findByIdAndUpdate(id,{name,parentCategory},{new:true})
    if(!cat) return errorHandler(createError(404,'no such category'),req,res)
    res.status(201).json(cat)
} catch (error) {
    errorHandler(error)
}

}


if(req.method==="DELETE"){

    verifyToken(req,res)
    if(req.user.email !=='ammar1@ammar.com') return errorHandler(createError(403,'not authorized'),req,res)
   
  const id = req.query.id

  
  try {
    const deleted = await Category.findByIdAndDelete(id)
    res.status(200).json(deleted)
  } catch (error) {

 errorHandler(error)
   console.log(error)
  }

   
    
}

}




export default connectDB(handler)