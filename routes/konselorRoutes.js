const {Router} = require('express');
const { getKonselor, getKonselorAll, addKonselor, getKonselorById, deleteKonselor, updateKonselor } = require('../controller/konselorController');

const router = Router();

router.get('/', getKonselor);
router.get('/count', getKonselorAll);
router.post('/tambah-konselor', addKonselor);
router.get('/:id',getKonselorById);
router.delete('/:id', deleteKonselor)
router.put('/:id', updateKonselor)

module.exports = router;