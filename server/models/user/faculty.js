import mongoose from "mongoose";
import User from "./user";

const facultySchema = User.discriminator('Faculty', 
    new mongoose.Schema(
        {
            facultyid: String,
        },
        { timestamps: true }
    ));

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;