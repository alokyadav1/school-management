/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
function AdminReducer(data, action) {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...data,
        students: action.payload,
      };
    case "SET_TEACHERS":
      return {
        ...data,
        teachers: action.payload,
      };
    case "ADD_STUDENT":
      if (data.students.length == 0) {
        return {
          ...data,
          students: [...data.students,action.payload], // Initialize it as an array with one element
        };
      } else {
        return {
          ...data,
          students: [...data.students, action.payload], // Use the spread operator to add to the existing array
        };
      }
    case "ADD_TEACHER":
      if (data.teachers.length == 0) {
        return {
          ...data,
          teachers: [action.payload], // Initialize it as an array with one element
        };
      } else {
        return {
          ...data,
          teachers: [...data.teachers, action.payload], // Use the spread operator to add to the existing array
        };
      }

    case "DELETE_STUDENT":
      return {
        ...data,
        students: data.students.filter(
          (student) => student._id !== action.payload.id
        ),
      };
    case "DELETE_TEACHER":
      return {
        ...data,
        teachers: data.teachers.filter(
          (teacher) => teacher._id !== action.payload.id
        ),
      };
    case "UPDATE_STUDENT":
      console.log("action.payload", action.payload);
      console.log("data", data.students);
      const updateStudent = data.students.map((student) => {
        if (student._id == action.payload.id) {
          console.log(true);
          console.log("student payload", action.payload.updatedStudent);
          return action.payload.updatedStudent;
        } else return student;
      });
      console.log("updatedStudent", updateStudent);
      return {
        ...data,
        students: updateStudent,
      };
    case "UPDATE_TEACHER":
      return {
        ...data,
        teachers: action.payload,
      };
    default:
      return data;
  }
}
export default AdminReducer;
