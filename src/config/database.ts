import mongoose from 'mongoose';


export const connectDatabase = async() => {
    try{
        const connect = mongoose.connect(`mongodb+srv://lawrenceime246:MHTUXVqcBW7A7s8K@cluster0.x5zkjh3.mongodb.net/exams`)
        console.log(`MongoDB connected successfully`)
    }catch(err){
        console.log(err)
    }
}