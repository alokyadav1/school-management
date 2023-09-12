import teacherModel from "../../model/teacher.js";
// import { v2 as cloudinary } from "cloudinary"
import { uploadToCloudinary } from "../../utils/cloudinaryUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// const uploadToCloudinary = async (file) => {
//     try {
//         const upload = await cloudinary.uploader.upload(file.path, {
//             folder: "teacher",
//             use_filename: true
//         })
//         console.log("upload: " + upload);
//         return upload
//     } catch (error) {
//         console.log(error);
//     }
// }

//create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    })
}


//add teacher
const addTeacher = async (req, res) => {
    const teacher = { ...req.body };
    console.log(req.body);
    try {
        //check if teacher already exists
        const exists = await teacherModel.findOne({ email: teacher.email })
        if (exists) {
            return res.status(400).json({ message: "teacher already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(teacher.password, salt)

         // upload profile pic to cloudinary
         const result = await uploadToCloudinary(req.file,"teacher")

        const newteacher = new teacherModel(
            {
                first_name: teacher.first_name,
                last_name: teacher.last_name || null,
                profile_pic:result?.secure_url || null,
                gender:teacher.gender,
                dob: teacher.dob || null,
                email: teacher.email,
                mobile: Number(teacher.mobile),
                password: hashedPassword
            }
        )
        const user = await newteacher.save()
        const token = createToken(user._id)
        res.status(200).json({ "teacher":user, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error, message: error.message })
    }
}

//remove teacher
const removeTeacher = async(req,res) => {
    const id = req.params.id
    try {
        const teacher = await teacherModel.findByIdAndDelete(id)
        res.status(200).json({teacher})
    } catch (error) {
        res.status(500).json({ error, message: error.message })
    }
}

//update teacher
const updateTeacher = async (req, res) => {
    const teacherData = { ...req.body };
    const id = req.params.id
    try {
        const teacher = await teacherModel.findById(id);
        if (!teacher) {
            return res.status(400).json({ message: "teacher not found" })
        }
        teacher.first_name = teacherData.first_name || teacher.first_name;
        teacher.last_name = teacherData.last_name || teacher.last_name;
        teacher.dob = teacherData.dob || teacher.dob;
        teacher.email = teacherData.email || teacher.email;
        teacher.mobile = teacherData.mobile || teacher.mobile;
        if(teacherData.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(teacherData.password, salt)
            teacher.password = hashedPassword
        }
        const updatedTeacher = await teacher.save()
        res.status(200).json({ updatedTeacher, message: "Teacher updated successfully" })
    } catch (error) {
        res.status(500).json({ error, message: error.message })
    }
}

//get all teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await teacherModel.find()
        res.status(200).json({ teachers })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export { addTeacher, removeTeacher, updateTeacher, getTeachers }