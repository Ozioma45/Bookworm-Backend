import {Router} from 'express';
const router= Router();
import {createUser,userLogin} from '../controllers/user.controller.js';

// user signup and signin routes
router.post('/user/signup',createUser)
router.post('/user/login',userLogin)

export default router;