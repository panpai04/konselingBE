const { Router } = require('express');
const { Register, Login,  Logout}  = require('../controller/Users');
const router = Router();


router.get('/logout', Logout)
router.post('/register', Register);
router.post('/login', Login);
router.delete ('/logout', Logout);
// router.get('/users', verifyToken, getUsers);


module.exports = router;