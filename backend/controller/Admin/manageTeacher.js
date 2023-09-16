import teacherModel from "../../model/teacher.js";
import adminModel from "../../model/admin.js";
// import { v2 as cloudinary } from "cloudinary"
import { uploadToCloudinary } from "../../utils/cloudinaryUtils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

//add teacher
const addTeacher = async (req, res) => {
  const teacher = { ...req.body };
  const adminID = req.user.id;
  try {
    //check if admin exists
    const adminExists = await adminModel.findById(adminID);
    if (!adminExists) {
      return res.status(500).json({ message: "admin not found" });
    }
    const admin = await teacherModel.findOne({ adminId: adminID });
    if (admin) {
      const teacherExists = await teacherModel.findOne({
        adminId: adminID,
        "teacherInfo.email": teacher.email,
      });
      //check if teaher already exists
      if (teacherExists) {
        return res.status(400).json({ message: "Teacher already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(teacher.password, salt);
      // upload profile pic to cloudinary
      const result = await uploadToCloudinary(req.file, "teacher");
      admin.teacherInfo.push({
        first_name: teacher.first_name,
        last_name: teacher.last_name || null,
        profile_pic: result?.secure_url || null,
        gender: teacher.gender,
        dob: teacher.dob || null,
        email: teacher.email,
        mobile: Number(teacher.mobile),
        password: hashedPassword,
      });
      const newTeacher = await admin.save();
      const token = createToken(newTeacher._id);
      res.status(200).json({
        teacher: newTeacher.teacherInfo[newTeacher.teacherInfo.length - 1],
        token,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(teacher.password, salt);

      // upload profile pic to cloudinary
      const result = await uploadToCloudinary(req.file, "teacher");

      const newteacher = new teacherModel({
        adminId: adminID,
        teacherInfo: [
          {
            first_name: teacher.first_name,
            last_name: teacher.last_name || null,
            profile_pic: result?.secure_url || null,
            gender: teacher.gender,
            dob: teacher.dob || null,
            email: teacher.email,
            mobile: Number(teacher.mobile),
            password: hashedPassword,
          },
        ],
      });
      const savedTeacher = await newteacher.save();
      const token = createToken(savedTeacher._id);
      res.status(200).json({
        teacher: savedTeacher.teacherInfo[savedTeacher.teacherInfo.length - 1],
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

//remove teacher
const removeTeacher = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTeacher = await teacherModel.updateOne(
      {
        "teacherInfo._id": id,
      },
      {
        $pull: {
          teacherInfo: {
            _id: id,
          },
        },
      },
      {
        new: true,
      }
    );
    const teacher = await teacherModel.findByIdAndDelete(id);
    res.status(200).json({ deletedTeacher });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

//update teacher
const updateTeacher = async (req, res) => {
  const teacherData = { ...req.body };
  const id = req.params.id;
  try {
    const teacher = await teacherModel.findOne({"teacherInfo._id": id});
    if (!teacher) {
      return res.status(400).json({ message: "teacher not found" });
    }
    if (teacherData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(teacherData.password, salt);
      teacherData.password = hashedPassword;
    }
    const d = await teacherModel.updateOne(
      {
        "teacherInfo._id": id,
      },
      {
        $set: {
          "teacherInfo.$.first_name": teacherData.first_name,
          "teacherInfo.$.last_name": teacherData.last_name,
          "teacherInfo.$.gender":teacherData.gender,
          "teacherInfo.$.profile_pic": teacherData.profile_pic,
          "teacherInfo.$.dob": teacherData.dob,
          "teacherInfo.$.mobile": teacherData.mobile,
          "teacherInfo.$.password": teacherData.password,

        },
      },
      {
        new: true,
      }
    );
    const updated = await teacherModel.findOne({ "teacherInfo._id": id });
    const updatedTeacher = updated.teacherInfo.find((s) => s._id == id);
    res
      .status(200)
      .json({ updatedTeacher, message: "Teacher updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

//get all teachers
const getTeachers = async (req, res) => {
  const adminID = req.user.id;
  try {
    const teachers = await teacherModel.find({ adminId: adminID });
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { addTeacher, removeTeacher, updateTeacher, getTeachers };
