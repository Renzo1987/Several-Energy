<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');


router.get('/user/:id', user_controller.getUserById);
router.get('/user', user_controller.getAllUsers);
router.post('/user', user_controller.createUser);
router.put('/user/:id', user_controller.updateUser);
router.delete('/user/:id', user_controller.deleteUser);

=======
const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');


router.get('/user/:id', user_controller.getUserByEmail);
router.get('/user/obtenerasesor/:email', user_controller.getUserByEmail);
router.post('/user/login', user_controller.handleLogin);
router.post('/user', user_controller.createUser);
router.put('/user/:id', user_controller.updateUser);
router.delete('/user/:id', user_controller.deleteUser);

>>>>>>> dev
module.exports = router