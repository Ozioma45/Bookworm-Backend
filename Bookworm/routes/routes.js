import {Router} from 'express';
const router= Router();
import {createUser,userLogin,findUserEmail,updatePassword,addProfilePicture} from '../controllers/user.controller.js';
import {getBooks, searchBooks} from '../controllers/book.controller.js';
import {saveBookshelf,getBookshelfByUser,deleteBookshelf} from '../controllers/bookshelf.controller.js';
import {createCategories,findCategories,deleteCategories} from '../controllers/bookcategorie.controller.js'
import {createSammary} from  '../controllers/summary.controller.js'
import passport from '../config/O-auth.js';


// google OAuth Router
router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  });

router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));
router.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/books',
    failureRedirect: '/auth/google/failure'
  })
);

router.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });
// user signup and signin routes
router.post('/user/signup',createUser)
router.post('/user/login',userLogin)
router.post('/user/findEmail',findUserEmail)
router.post('/user/updatePassword',updatePassword)
router.post('/user/addProfilePicture',addProfilePicture)

// Book routes
router.get('/books',getBooks)
router.post('/books/search',searchBooks)

// Bookshelf routes
router.post('/saveBookshelf',saveBookshelf)
router.get('/getBookshelfByUser',getBookshelfByUser)
router.delete('/deleteBookshelf/:id',deleteBookshelf)

// Book Category
router.post('/createCategory',createCategories)
router.get('/category',findCategories)
router.delete('/deleteCategory',deleteCategories)

// Book Sammary
router.post('/createSammary',createSammary)
export default router;