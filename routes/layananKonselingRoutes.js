const { Router } = require('express')
const { getLayananKonseling, deleteLayananKonseling } = require('../controller/layananKonselingController');

const router = Router();

router.get('/', getLayananKonseling);
router.delete('/:id', deleteLayananKonseling);

module.exports = router;

