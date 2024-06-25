const { Router } = require('express');
const { getPelanggaran, addPelanggaran, getPelanggaranById, deletePelanggaran, updatePelanggaran } = require ('../controller/pelanggaranController');
const router = Router();

router.get('/', getPelanggaran);

router.post('/tambah-pelanggaran',  addPelanggaran);
router.get('/:id',  getPelanggaranById);
router.delete('/:id', deletePelanggaran);
router.put('/:id', updatePelanggaran);

module.exports = router;