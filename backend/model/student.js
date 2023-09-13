import mongoose from "mongoose";
const studentSchema = mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  studentInfo: [
    {
      password: {
        type: String,
        required: true,
      },
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: false,
      },
      profile_pic: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: false,
      },
      dob: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
      },
      mobile: {
        type: Number,
        required: false,
      },
      standard: {
        type: Number,
        required: true,
      },
      remarks: {
        type: String,
        required: false,
      },
      academic_details: [
        {
          exam_name: String,
          marks: [
            {
              subject: String,
              marks_obtained: Number,
              total_marks: Number,
            },
          ],
        },
      ],
    },
  ],
});
const studentModel = mongoose.model("Student", studentSchema);
export default studentModel;
