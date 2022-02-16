const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/Auth');
const upload = require('../middleware/upload')

const { createUser, checkUser, checkLogin, userLogout, finalCheckUser, fetchOptions,createUser2} = require('../controllers/user');

router.post('/signup/:uid', upload.fields([{ name: 'file0', maxCount: 1 }, { name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }, { name: 'file3', maxCount: 1 }, { name: 'file4', maxCount: 1 }]),createUser);
router.post('/login', checkUser);
router.post('/signup2',createUser2);
router.get('/signupOptions', fetchOptions);
router.post('/login/verify', finalCheckUser);
router.get('/check', isAuth, checkLogin);
router.get('/logout', isAuth, userLogout);


module.exports = router;