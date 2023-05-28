import mongoose from "mongoose";


const connectDB = handler => async (req,res) =>{
    if(mongoose.connections[0].readyState){
console.log('db wroks')
        return handler(req,res)
    }
    await mongoose.connect(process.env.MONGO,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('db started')
    return handler(req,res)
}

export default connectDB