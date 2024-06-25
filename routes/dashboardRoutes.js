const { Router } = require("express");
const { getCountStudent, 
        getCountKelas,
        getCountPelanggaran,
        getCountKonselor
    } = require('../controller/dashboardController');
const { verifyToken, verifyRole } = require('../middleware/verify')
const router = Router();


router.get("/admin/count-students", verifyToken, verifyRole('admin'), getCountStudent);
router.get("/admin/count-kelas", verifyToken, verifyRole('admin'), getCountKelas);
router.get("/admin/count-pelanggaran", verifyToken, verifyRole('admin'), getCountPelanggaran);
router.get("/admin/count-konselor", verifyToken, verifyRole('admin'), getCountKonselor);


module.exports = router;



