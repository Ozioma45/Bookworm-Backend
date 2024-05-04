import {Router} from 'express';
const router= Router();
import {createUser,userLogin} from '../controllers/user.controller.js';
import {getBooks, searchBooks} from '../controllers/book.controller.js';
import {saveBookshelf,getBookshelfByUser,deleteBookshelf} from '../controllers/bookshelf.controller.js';

// user signup and signin routes
router.post('/user/signup',createUser)
router.post('/user/login',userLogin)

// Book routes
router.get('/books',getBooks)
router.post('/books/search',searchBooks)

// Bookshelf routes
router.post('/saveBookshelf',saveBookshelf)
router.get('/getBookshelfByUser',getBookshelfByUser)
router.delete('/deleteBookshelf/:id',deleteBookshelf)
export default router;