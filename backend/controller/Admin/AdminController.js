import adminModel from "../../model/admin.js";
import studentModel from "../../model/student.js";
import teacherModel from "../../model/teacher.js";
import sendMail from "../../emails/email.js";
import ejs from "ejs";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

//login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Admin does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.status(200).json({ admin: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//register admin
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user already exists
    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const verifyToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const link = `${process.env.FRONTEND_URL}/verify/${verifyToken}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new adminModel({ email, password: hashedPassword });
    const user = await newAdmin.save();
    // await sendMail({ to: email, subject: "Verify your email", link });
    await sendMail({
      to: email,
      subject: "Verify your email",
      link,
      mailType: "welcome",
    });
    const token = createToken(user._id);
    res.status(200).json({
      admin: user,
      token,
      message: "Please check your email for verification",
    });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

//get admin info
const getAdmin = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await adminModel.find({ _id: id });
    res.status(200).json({ admin: user[0] });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

//verify admin
const verifyAdmin = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await adminModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.verified) {
      return res
        .status(400)
        .json({ message: "Link expired or Email already verified" });
    }
    user.verified = true;
    await user.save();
    res.status(200).json({
      message: `${decoded.email} verified successfully`,
      email: decoded.email,
    });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

const sendEmail = async (req, res) => {
  const { email } = req.body;
  const verifyToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const link = `${process.env.FRONTEND_URL}/verify/${verifyToken}`;
  try {
    // await sendMail({ to: email, subject: "Verify your email", html });
    await sendMail({
      to: email,
      subject: "Verify your email",
      link,
      mailType: "welcome",
    });
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Admin does not exist" });
  }
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const link = `${process.env.FRONTEND_URL}/setPassword/${token}`;

  try {
    // await sendMail({to: email, subject: "Reset your password", html});
    await sendMail({
      to: email,
      subject: "Reset Password",
      link,
      mailType: "reset",
    });
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

const setPassword = async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await adminModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(502).json({ message: error.message });
  }
};

export {
  loginAdmin,
  registerAdmin,
  getAdmin,
  verifyAdmin,
  sendEmail,
  forgotPassword,
  setPassword,
};
