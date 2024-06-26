const {Router} = require ("express");
const router = Router();
const { 
    getPelanggaran,
    getPelanggaranById,
    deletePelanggaranById,
    updatePelanggaranById,
    inputPelanggaran
} = require('../controller/adminPelanggaranController');
//Routing
router.get('/api/pelanggaran',getPelanggaran);
router.get('/api/pelanggaran/:id',getPelanggaranById);
router.post('/api/pelanggaran',inputPelanggaran);
router.put('/api/pelanggaran/:id',updatePelanggaranById);
router.delete('/api/pelanggaran/:id',deletePelanggaranById);


module.exports = router;