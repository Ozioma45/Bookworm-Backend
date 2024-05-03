import {Router} from 'express';
const router= Router();
import {createUser,userLogin} from '../controllers/user.controller.js';
import {getBooks, searchBooks} from '../controllers/books.controller.js';

// user signup and signin routes
router.post('/user/signup',createUser)
router.post('/user/login',userLogin)

// Book routes

router.get('/books',getBooks)
router.post('/books/search',searchBooks)
export default router;