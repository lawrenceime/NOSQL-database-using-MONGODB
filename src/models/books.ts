import mongoose, {Schema} from "mongoose";

export interface IBooks {

    _id: string,
    name: string,
    description: string,
    page_count: number
}

const bookSchema = new Schema ({
    _id:{
        type:String,
        require:[true]
    },

    name:{
        type:String,
        require:[true]
        
    },

    description:{
        type:String,
        require:[true]
    },

    page_count:{
        type: Number,
        require: [true]
    }
},{
    timestamps: true
})


const Book = mongoose.model<IBooks>('Book', bookSchema)

export default Book;