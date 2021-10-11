const express = require('express');
import userController from '../controller/user.controller'
const router = express.Router();

router.post('/user', userController.addUser)

export default router
