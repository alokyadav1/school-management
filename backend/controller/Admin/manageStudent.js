import studentModel from "../../model/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import { uploadToCloudinary } from "../../utils/cloudinaryUtils.js";
//create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    })
}

// const uploadToCloudinary = async (file) => {
//     try {
//         const upload = await cloudinary.uploader.upload(file.path, {
//             folder: "student",
//             use_filename: true
//         })
//         console.log("upload: " + upload);
//         return upload
//     } catch (error) {
//         console.log(error);
//     }
// }

//add student
const addStudent = async (req, res) => {
    const student = { ...req.body };
    console.log(req.body);
    console.log(req.file);
    try {
        //check if student already exists
        const exists = await studentModel.findOne({ email: student.email })
        if (exists) {
            return res.status(400).json({ message: "Student already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(student.password, salt)
        // upload profile pic to cloudinary
        const result = await uploadToCloudinary(req.file,"student")
        console.log(result);
        const newStudent = new studentModel(
            {
                first_name: student.first_name,
                last_name: student.last_name || "",
                profile_pic:result?.secure_url || null,
                gender:student.gender,
                dob: student.dob || null,
                email: student.email,
                standard: Number(student.standard),
                mobile: Number(student.mobile) || null,
                password: hashedPassword
            }
        )
        const user = await newStudent.save()
        const token = createToken(user._id)
        res.status(200).json({ "student": user, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error, message: error.message })
    }
}

const removeStudent = async (req, res) => {
    const id = req.params.id
    try {
        const student = await studentModel.findByIdAndDelete(id)
        res.status(200).json({ removedStudent: student, message: "Student deleted successfully" })
    } catch (error) {
        res.status(500).json({ error, message: error.message })
    }
}

const updateStudent = async (req, res) => {
    const studentData = { ...req.body };
    const id = req.params.id
    try {
        const student = await studentModel.findById(id);
        if (!student) {
            return res.status(400).json({ message: "Student not found" })
        }
        student.first_name = studentData.first_name || student.first_name;
        student.last_name = studentData.last_name || student.last_name;
        student.gender = studentData.gender || student.gender;
        student.dob = studentData.dob || student.dob;
        student.email = studentData.email || student.email;
        student.mobile = studentData.mobile || student.mobile;
        if (studentData.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(studentData.password, salt)
            student.password = hashedPassword
        }
        const updatedStudent = await student.save()
        res.status(200).json({ updatedStudent, message: "Student updated successfully" })
    } catch (error) {
        res.status(500).json({ error, message: error.message })
    }
}

const addAcademicDetails = async (req, res) => {
    const {exam_name,marks} = req.body;
    const id = req.params.id
    try{
        const student = await studentModel.findById(id);
        if (!student) {
            return res.status(400).json({ message: "Student not found" })
        }
        student.academic_details.push({exam_name,marks})
        const updatedStudent = await student.save()
        res.status(200).json({ updatedStudent, message: "Student updated successfully" })
    } catch(error){
        res.status(500).json({ error, message: error.message })
    }
}


const getStudents = async (req, res) => {
    try {
        const students = await studentModel.find()
        res.status(200).json({ students })
    } catch (error) {
        res.status(500).json({ error, message: error.message })
    }
}


export { addStudent, removeStudent, updateStudent, addAcademicDetails, getStudents }