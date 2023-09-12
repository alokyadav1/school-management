import adminModel from "../../model/admin.js";
import studentModel from "../../model/student.js";
import teacherModel from "../../model/teacher.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    })
}

//login admin
const loginAdmin = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await adminModel.findOne({email})

        if(!user){
            return res.status(400).json({message: "Admin does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = createToken(user._id)
        res.status(200).json({"admin":user,token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//register admin
const registerAdmin = async (req,res) => {
    const {email, password} = req.body;
    console.log(req.body);
    try{
        //check if user already exists
        const exists = await adminModel.findOne({email})
        if(exists){
            return res.status(400).json({message: "Admin already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newAdmin = new adminModel({email, password: hashedPassword})
        const user = await newAdmin.save()
        const token = createToken(user._id)
        res.status(200).json({"admin":user,token})

    } catch(error){
        res.status(500).json({error,message: error.message})
    }
}

//get admin info
const getAdmin = async (req,res) => {
    console.log(req.user.id);
    const id = req.user.id
    try{
        const user = await adminModel.find({_id:id})
        console.log("Admin: ", user);
        res.status(200).json({admin: user[0]})
    } catch(error){
        res.status(502).json({message: error.message})
    }
}
export {loginAdmin, registerAdmin, getAdmin}