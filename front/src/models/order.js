import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    city:{type:String,required:true},
    postal:{type:String,required:true},
    street:{type:String,required:true},
    country:{type:String,required:true},
    cart:{type:[Object],required:true},
},{timestamps:true})






export default mongoose.models.Order || mongoose.model('Order',OrderSchema)