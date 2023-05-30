import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({

    name:{type:String,required:true},
    parentCategory:{type:String,required:false},
},{timestamps:true})



export default mongoose.models.Category || mongoose.model('Category',CategorySchema)