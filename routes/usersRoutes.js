const { Router } = require ('express');
const { getUsers, deleteUsers, getJenisKelamin } = require ('../controller/Users');
const router = Router();


router.get('/', getUsers);

router.get('/jenis-kelamin', getJenisKelamin);


router.delete('/:id', deleteUsers);

module.exports = router;