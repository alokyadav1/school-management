/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
function AdminReducer(data,action) {
    switch (action.type) {
        case "SET_STUDENTS":
            return {
                ...data,
                students: action.payload
            };
        case "SET_TEACHERS":
            return {
                ...data,
                teachers: action.payload
            };
        case "ADD_STUDENT":
            return {
                ...data,
                students: [...data.students, action.payload]
            };
        case "ADD_TEACHER": 
            return {
                ...data,
                teachers: [...data.teachers, action.payload]
            };
        case "DELETE_STUDENT":
            return {
                ...data,
                students: data.students.filter((student) => student._id !== action.payload.id)
            }
        case "DELETE_TEACHER":
            return {
                ...data,
                teachers: data.teachers.filter((teacher) => teacher._id !== action.payload.id)
            }
        case "UPDATE_STUDENT":
            const updatedStudent = data.students.filter(student => {
                if (student._id === action.payload.id) {
                    return action.payload.updatedStudent
                }
                return student;
            })
            return {
                ...data,
                students: updatedStudent
            }
        case "UPDATE_TEACHER":
            return {
                ...data,
                teachers:action.payload
            }
        default:
            return data;
    }
}
export default AdminReducer;