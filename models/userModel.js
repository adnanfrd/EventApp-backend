import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);
export default User;  
