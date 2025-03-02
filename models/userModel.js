import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    patientName: {
        type: String,
    },
    doctorName: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);
export default User;  
