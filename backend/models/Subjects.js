import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
})

// Model
const subjectModel = mongoose.model("subject", subjectSchema)

export default subjectModel