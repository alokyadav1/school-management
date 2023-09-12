// //get teacher info
// const getTeacher = async (req, res) => {
//     console.log(req.user.id);
//     const id = req.user.id
//     try {
//         const user = await teacherModel.find({ _id: id })
//         console.log("User: ", user);
//         res.status(200).json({ teacher: user[0] })
//     } catch (error) {
//         res.status(502).json({ message: error.message })
//     }
// }