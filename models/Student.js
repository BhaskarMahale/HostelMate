import mongoose from "mongoose";
const studentInfo = new mongoose.Schema({
    Name: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    age: { type: String, required: true },
    Address: { type: String, required: true },
    RoomNumber: { type: String, required: true }

}, { timestamps: true });

const Student = mongoose.model("Student", studentInfo);

export default Student;