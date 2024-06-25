const {Router} = require('express');
const { getKelas, getKelasById, SiswaKelasById, getKelasOptions, getClassName, addKelas, getKelasAll, deleteKelas, updateKelas } = require('../controller/kelasController');
const { verifyToken, verifyRole } = require('../middleware/verify')

const router = Router();
router.get('/kelas/:id/siswa', SiswaKelasById);  

router.get('/', verifyToken, verifyRole('admin'), getKelas);


router.get('/option', getKelasOptions);
router.get('/nama-kelas', verifyToken, verifyRole('admin'), getClassName);
router.get('/count', getKelasAll);
router.get('/:id', getKelasById);
router.post('/tambah-kelas', verifyToken, verifyRole('admin'), addKelas);
router.delete('/:id', verifyToken, verifyRole('admin'), deleteKelas);
router.put('/:id',  updateKelas);

module.exports = router;
