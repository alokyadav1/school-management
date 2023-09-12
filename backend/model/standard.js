import mongoose from "mongoose";
const standardSchema = mongoose.Schema({
    standard:{
        type:Number,
        required:true,
    },
    subjects:[{
        subjectName:String,
        teacherID:String,
    }],
    classTeacherID:{
        type:String,
        required:true,
    },
})
const standardModel = mongoose.model("Standard", standardSchema)
export default standardModel;