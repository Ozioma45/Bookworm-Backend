import Bookshelf from "../model/bookShelf.js";

export const createBookshelf= async(user,name,author,genre,description,image) =>{
       try{
        const bookshelf = new Bookshelf({
            user,
            name,
            author,
            genre,
            description,
            image
        })
       await bookshelf.save();
        return bookshelf;
       }catch(error){
        console.error('Error creating bookshelf:', error);
        throw error;
       }
}

export const findBookshelfByUser = async(id)=>{
    try{
      const bookshelf = await Bookshelf.find({user:id});
      return bookshelf;
    }catch(error){
        console.error('Error finding bookshelves by user:', error);
        throw error;
    }
}

export const deleteBookshelfByUser = async (userId, bookId) => {
    try {
        const userBookshelves = await Bookshelf.find({ user: userId });
        let bookshelfFound = false;
        for (const bookshelf of userBookshelves) {
            if (bookshelf._id.equals(bookId)) {
                await Bookshelf.deleteOne({ _id: bookId });
                bookshelfFound = true;
                break;
            }
        }
        if (!bookshelfFound) {
            return 'Bookshelf not found';
        }
    } catch (error) {
        // Error handling
        console.error('Error deleting bookshelf:', error);
        throw error;
    }
};
