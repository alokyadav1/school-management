import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import fileUpload from "../middleware/fileUpload.js";
import {
  loginAdmin,
  registerAdmin,
  getAdmin,
  verifyAdmin,
  sendEmail,
  forgotPassword,
  setPassword,
} from "../controller/Admin/AdminController.js";

import {
  addTeacher,
  removeTeacher,
  updateTeacher,
  getTeachers,
} from "../controller/Admin/manageTeacher.js";

import {
  addStudent,
  removeStudent,
  updateStudent,
  addAcademicDetails,
  getStudents,
} from "../controller/Admin/manageStudent.js";

import {
  addStandard,
  getStandard,
} from "../controller/Admin/standardController.js";

const router = express.Router();

//admin
router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/getAdmin", requireAuth, getAdmin);
router.get("/verify/:token", verifyAdmin);
router.post("/sendEmail", sendEmail);
router.post("/forgotPassword", forgotPassword);
router.post("/setPassword/:token", setPassword);

//teacher
router.post(
  "/addTeacher/",
  fileUpload.single("image"),
  requireAuth,
  addTeacher
);
router.get("/getTeachers", requireAuth, getTeachers);
router.delete("/removeTeacher/:id", requireAuth, removeTeacher);
router.patch("/updateTeacher/:id", requireAuth, updateTeacher);

//student
router.post(
  "/addStudent/",
  fileUpload.single("image"),
  requireAuth,
  addStudent
);
router.get("/getstudents", requireAuth, getStudents);
router.delete("/removeStudent/:id", requireAuth, removeStudent);
router.patch("/updateStudent/:id", requireAuth, updateStudent);
router.patch("/addAcademicDetails/:id", requireAuth, addAcademicDetails);

//standard
router.post("/addStandard", requireAuth, addStandard);
router.get("/getStandards", requireAuth, getStandard);

export default router;
