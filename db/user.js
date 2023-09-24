import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    UserId : Number,
    UserName : String,
    Password : String,
    Age : Number,
    Email : String,
    Mobile : String
})

const userModel = mongoose.model("users", userSchema);

export default userModel;