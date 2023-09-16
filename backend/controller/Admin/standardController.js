import mongoose from "mongoose";
import standardModel from "../../model/standard.js"
import teacherModel from "../../model/teacher.js";

const addStandard = async (req, res) => {
    const data = { ...req.body };
    try {
        
        const standardExists = await standardModel.findOne({ standard: data.standard })
        if(standardExists){
            return res.status(400).json({message:"Standard already exists"})
        }

        const classTeacher = await teacherModel.findById(data.classTeacherID)
        if(!classTeacher){
            return res.status(400).json({message:"Class teacher not found"})
        } 

        for(let i=0;i<data.subjects.length;i++){
            const teacher = await teacherModel.findById(data.subjects[i].teacherID)
            if(!teacher){
                return res.status(400).json({message:`Teacher with id ${data.subjects[i].teacherID} for subject ${data.subjects[i].subjectName} not found`})
            }
        }

        const newStandard = new standardModel(
            {
                standard: data.standard,
                subjects: data.subjects,
                classTeacherID:data.classTeacherID,
            }
        )
        const standard = await newStandard.save()
        res.status(200).json({ "standard": standard })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getStandard = async(req,res) => {
    try {
        const standards = await standardModel.find();
        return res.status(200).json({standards})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
export { addStandard, getStandard}