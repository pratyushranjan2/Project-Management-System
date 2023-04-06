import mongoose from "mongoose";
import User from "./user";

const studentSchema = User.discriminator('Student', 
    new mongoose.Schema(
        {
            rollno: String,
            batch: String,
        },
        { timestamps: true }
    ));

const Student = mongoose.model('Student', studentSchema);

export default Student;