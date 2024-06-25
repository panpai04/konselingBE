const {Router} = require("express");
const { getStudents,
        getStudentsById, 
        updateStudent, 
        deleteStudent, 
    } = require('../controller/siswaController');
const router = Router();


router.get("/",getStudents);
router.get('/:id', getStudentsById);
router.put('/:id', updateStudent)
router.delete("/:id", deleteStudent);

module.exports = router;