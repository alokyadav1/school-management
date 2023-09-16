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
      const updateStudent = data.students.map((student) => {
        if (student._id == action.payload.id) {
          return action.payload.updatedStudent;
        } else return student;
      });
      return {
        ...data,
        students: updateStudent,
      };

    case "UPDATE_TEACHER":
      const updateTeacher = data.teachers.map((teacher) => {
        if (teacher._id == action.payload.id) {
          return action.payload.updatedTeacher;
        } else return teacher;
      });
      return {
        ...data,
        teachers: updateTeacher,
      };

    default:
      return data;
  }
}
export default AdminReducer;
