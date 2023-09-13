import mongoose from "mongoose";
const teacherSchema = mongoose.Schema({
    adminId:{
        type:String,
        required:true
    },
    teacherInfo:[{
        password:{
            type: String,
            required: true,
        },
        first_name:{
            type: String,
            required: true,
        },
        last_name:{
            type: String,
            required: false,
        },
        gender:{
            type: String,
            required: true,
        },
        profile_pic:{
            type: String,
            required: false,
        },
        dob:{
            type: String,
            required: false,
        },
        email:{
            type: String,
            required: true,
        },
        mobile:{
            type: Number,
            required: false,
        },
    }]
})
const teacherModel = mongoose.model("Teacher", teacherSchema)
export default teacherModel;