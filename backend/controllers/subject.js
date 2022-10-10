import SubjectModel from '../models/Subjects.js'

class SubjectsController {

    static subjectList = async (req, res) => {
        try {
            const subjects = await SubjectModel.find().select({ name: 1, _id: 0 })
            res.status(200).send({ "status": "success", "subjects": subjects })
        } catch (error) {
            console.log(error)
        }
    }

}

export default SubjectsController;