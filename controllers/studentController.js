import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
    try {
        const {medium,studentName,rollNo,course,motherName,gender,cast } = req.body;
        const student = await Student.create({medium,studentName,rollNo,course,motherName,gender,cast});
        res.json({ msg: "student created successfully", student });
    } catch (error) {
        res.status(400).json({ msg: "Error creating student", error: error.message });
    }
};

export const getStudents = async (req,res)=>{
   const students = await Student.find();
   res.json(students);
}



















// export const updateStudent = async (req,res)=>{
//     try {
//         const {id} = req.params;
//         const {medium,studentName,rollNo,course,mother} = req.body;
//         const student = await Student.findByIdAndUpdate(id,{medium,studentName,rollNo,course,mother},{new:true});
//         res.json({msg:"student updated successfully",student});
//     } catch (error) {
//         res.status(400).json({msg:"Error updating student",error:error.message});
//     }
// }

// export const deleteStudent = async (req,res)=>{
//     try {
//         const {id} = req.params;
//         await Student.findByIdAndDelete(id);
//         res.json({msg:"student deleted successfully"});
//     } catch (error) {
//         res.status(400).json({msg:"Error deleting student",error:error.message});
//     }
// }

