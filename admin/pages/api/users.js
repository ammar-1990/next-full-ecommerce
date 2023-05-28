 import connectDB from "@/middleware/mongodb"
 
 
 const handler = async(req, res)=> {
if(req.method === "GET"){
    res.status(200).json('works')
}


 
  }


  export default connectDB(handler)