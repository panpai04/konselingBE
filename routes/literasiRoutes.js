const { Router } = require('express')
const { getLiterasi, getLiterasiById } = require('../controller/literasiController');

const router = Router();

router.get('/', getLiterasi);
router.get('/:id', getLiterasiById);

module.exports = router;

