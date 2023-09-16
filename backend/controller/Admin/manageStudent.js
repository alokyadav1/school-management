import studentModel from "../../model/student.js";
import adminModel from "../../model/admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { uploadToCloudinary } from "../../utils/cloudinaryUtils.js";
//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

//add student
const addStudent = async (req, res) => {
  const student = { ...req.body };
  //   const adminID = req.params.id;
  const adminID = req.user.id;
 
  try {
    //check if admin exists
    const adminExists = await adminModel.findById(adminID);
    if (!adminExists) {
      return res.status(500).json({ message: "admin not found" });
    }
    const admin = await studentModel.findOne({ adminId: adminID });

    if (admin) {
      const studentExists = await studentModel.findOne({
        adminId: adminID,
        "studentInfo.email": student.email,
      });
      //check if student already exists
      if (studentExists) {
        return res.status(400).json({ message: "Student already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(student.password, salt);
      // upload profile pic to cloudinary
      const result = await uploadToCloudinary(req.file, "student");
      admin.studentInfo.push({
        first_name: student.first_name,
        last_name: student.last_name || "",
        profile_pic: result?.secure_url || null,
        gender: student.gender,
        dob: student.dob || null,
        email: student.email,
        standard: Number(student.standard),
        mobile: Number(student.mobile) || null,
        password: hashedPassword,
      });
      const newStudent = await admin.save();
      const token = createToken(newStudent._id);
      res.status(200).json({
        student: newStudent.studentInfo[newStudent.studentInfo.length - 1],
        token,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(student.password, salt);
      // upload profile pic to cloudinary
      const result = await uploadToCloudinary(req.file, "student");
      const newStudent = new studentModel({
        adminId: adminID,
        studentInfo: [
          {
            first_name: student.first_name,
            last_name: student.last_name || "",
            profile_pic: result?.secure_url || null,
            gender: student.gender,
            dob: student.dob || null,
            email: student.email,
            standard: Number(student.standard),
            mobile: Number(student.mobile) || null,
            password: hashedPassword,
          },
        ],
      });
      const savedStudent = await newStudent.save();
      const token = createToken(savedStudent._id);
      res.status(200).json({
        student: savedStudent.studentInfo[savedStudent.studentInfo.length - 1],
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

const removeStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedStudent = await studentModel.updateOne(
      {
        "studentInfo._id": id,
      },
      {
        $pull: {
          studentInfo: {
            _id: id,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      removedStudent: deletedStudent,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

const updateStudent = async (req, res) => {
  const studentData = { ...req.body };
  const id = req.params.id;
  const adminID = req.user.id;
  try {
    const student = await studentModel.findOne({ "studentInfo._id": id });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    if (studentData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(studentData.password, salt);
      studentData.password = hashedPassword;
    }
    // upload profile pic to cloudinary
    const result = await uploadToCloudinary(req.file, "student");
    const d = await studentModel.updateOne(
      {
        "studentInfo._id": id,
      },
      {
        $set: {
          "studentInfo.$.first_name": studentData.first_name,
          "studentInfo.$.last_name": studentData.last_name,
          "studentInfo.$.gender": studentData.gender,
          "studentInfo.$.profile_pic": result?.secure_url,
          "studentInfo.$.dob": studentData.dob,
          "studentInfo.$.mobile": Number(studentData.mobile) || undefined,
          "studentInfo.$.password": studentData.password,
        },
      },
      {
        new: true,
      }
    );

    const updated = await studentModel.findOne({ "studentInfo._id": id });
    const updatedStudent = updated.studentInfo.find((s) => s._id == id);
    res
      .status(200)
      .json({ updatedStudent, message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

const addAcademicDetails = async (req, res) => {
  const { exam_name, marks } = req.body;
  const id = req.params.id;
  try {
    const student = await studentModel.findOne({ "studentInfo._id": id });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    const update = await studentModel.updateOne(
      {
        "studentInfo._id": id,
      },
      {
        $push: {
          "studentInfo.$.academic_details": {
            exam_name,
            marks,
          },
        },
      },
      {
        new: true,
      }
    );
    const updated = await studentModel.findOne({ "studentInfo._id": id });
    const updatedStudent = updated.studentInfo.find((s) => s._id == id);
    res.status(200).json({
      updatedStudent,
      message: "Student academic details added successfully",
    });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

const getStudents = async (req, res) => {
  const adminID = req.user.id;
  try {
    const students = await studentModel.find({ adminId: adminID });
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

export {
  addStudent,
  removeStudent,
  updateStudent,
  addAcademicDetails,
  getStudents,
};
