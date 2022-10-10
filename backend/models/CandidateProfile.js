import mongoose from "mongoose";

// Defining Schema
const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  standard: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  enrollmentFrom: {
    type: Date,
    required: true,
  },
  enrollmentTo: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  subjects: {
    type: [],
    required: true
  }
}, { timestamps: true })

// Model
const CandidateProfileModel = mongoose.model("candidateprofile", candidateSchema)

export default CandidateProfileModel