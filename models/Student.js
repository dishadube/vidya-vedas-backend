import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

    medium: {
        type: String,
        required: true,
        enum: ['English', 'Hindi', 'Marathi'],
        default: 'English'
    },
    
    studentName: {
        type: String,
        required: [true, 'Student Name is required'],
        trim: true,
        maxlength: 100
    },
   
    rollNo: {
        type: String,
        required: [true, 'Roll Number is required'],
        unique: true, // Ensures no two students have the same rollNo
        trim: true
    },
   
    course: {
        type: String,
        required: [true, 'Course is required'],
        trim: true,
        maxlength: 50
    },
    
    motherName: {
        type: String,
        required: [true, "Mother's Name is required"],
        trim: true,
        maxlength: 100
    },
   
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other']
    },
    
    cast: {
        type: String,
        required: true,
        enum: ['General', 'EWS', 'OBC', 'SC', 'ST'],
        default: 'General'
    },
}, {
    timestamps: true 
});

export default mongoose.model("Student", studentSchema);