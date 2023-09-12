import mongoose from "mongoose";
const programSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
    category:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    semesters:[
        {
            year:Number,
            semester:Number,
            fee:Number,
        }
    ]
})

const programModel = mongoose.model("program", programSchema)
export default programModel;