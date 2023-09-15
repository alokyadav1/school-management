import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    verified:{
        type: Boolean,
        default: false,
    },
})

const adminModel = mongoose.model("Admin", adminSchema)
export default adminModel;