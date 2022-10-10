import express from 'express';
const router = express.Router();
import CandidateProfileController from '../controllers/candidateProfileController.js';
import SubjectsController from '../controllers/subject.js'


// student routes
router.post('/candidate', CandidateProfileController.saveProfile)
router.get('/candidate/list', CandidateProfileController.profileList)
router.post('/candidate/list', CandidateProfileController.filterProfileList)
router.put('/candidate', CandidateProfileController.updateProfile)
router.delete('/candidate/:id', CandidateProfileController.deleteProfile)
router.delete('/candidate', CandidateProfileController.deleteProfile)

// subject routes
router.get('/subject/list', SubjectsController.subjectList)

export default router;