import { deleteCookie } from "cookies-next"
import connectDB from "@/middleware/mongodb"


const handler = async(req,res)=>{
console.log('logged out')

deleteCookie('accessToken',{req,res})

res.json('done')
}




export default connectDB(handler)