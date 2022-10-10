import CandidateProfileModel from '../models/CandidateProfile.js'
import { startOfDay, endOfDay } from 'date-fns'

class CandidateProfileController {
  static saveProfile = async (req, res) => {
    try {
      const { firstName, lastName, dob, age, standard, city, skills, description, enrollmentFrom, enrollmentTo, status, isActive, subjects } = req.body
      const data = new CandidateProfileModel({
        firstName,
        lastName,
        dob,
        age,
        standard,
        city,
        skills,
        description,
        enrollmentFrom,
        enrollmentTo,
        status,
        isActive,
        subjects
      })

      const candidate = await data.save()
      res.status(201).send({ "status": "success", "message": "Profile Uploaded Successfully", "candidate": candidate })

    } catch (error) {
      console.log(error)
    }
  }

  static updateProfile = async (req, res) => {
    try {
      const { id, firstName, lastName, dob, age, standard, city, skills, description, enrollmentFrom, enrollmentTo, status, isActive, subjects } = req.body
      const candidate = await CandidateProfileModel.findByIdAndUpdate(id, {
        firstName,
        lastName,
        dob,
        age,
        standard,
        city,
        skills,
        description,
        enrollmentFrom,
        enrollmentTo,
        status,
        isActive,
        subjects
      })

      

      res.status(201).send({ "status": "success", "message": "Profile updated Successfully", "candidate": candidate })

    } catch (error) {
      console.log(error)
    }
  }

  static deleteProfile = async (req, res) => {
    try {
      if (req?.body?.ids) {
        await CandidateProfileModel.deleteMany({ _id: req.body.ids })
        res.status(200).send({ "status": "success", "message": "Profile Deleted Successfully" })
      }
      await CandidateProfileModel.findByIdAndDelete(req?.params?.id)
      res.status(200).send({ "status": "success", "message": "Profile Deleted Successfully" })
    } catch (error) {
      console.log(error)
    }
  }

  static profileList = async (req, res) => {
    try {
      const candidates = await CandidateProfileModel.find()
      res.status(200).send({ "status": "success", "candidates": candidates })
    } catch (error) {
      console.log(error)
    }
  }


  static filterProfileList = async (req, res) => {

    const { enrollmentFrom, enrollmentTo, skills } = req.body;

    try {
      let filters = {}
      if (enrollmentFrom) {
        filters.enrollmentFrom = {
          $gte: startOfDay(new Date(enrollmentFrom)),
          $lte: endOfDay(new Date(enrollmentFrom))
        }
      }
      if (enrollmentTo) {
        filters.enrollmentTo = {
          $gte: startOfDay(new Date(enrollmentTo)),
          $lte: endOfDay(new Date(enrollmentTo))
        }
      }
      const candidates = await CandidateProfileModel.aggregate([{ $match: { ...filters, skills: { '$in': skills } } }])
      res.status(200).send({ "status": "success", "candidates": candidates })
    } catch (error) {
      console.log(error)
    }
  }



}

export default CandidateProfileController;