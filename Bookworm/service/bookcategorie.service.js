import  Categorie from '../model/bookcategorie.js';

export const createCategorie= async(user,name) =>{
    try{
        const categorie = new Categorie({
            user,
            name
        });
        categorie.save()
        return categorie;
    }catch(error){
        console.log(error)
    }
}

export const findCategorieByUser = async(id,name)=>{
    try{
      const categorie = await Categorie.find({user:id});
      const existingCategory = categorie.some(cat => cat.name === name);
      return existingCategory;
    }catch(error){
        console.error('Error finding categorie by user:', error);
        throw error;
    }
}

export const findCategorieById = async(id)=>{
    try{
      const categorie = await Categorie.find({user:id});
      return categorie;
    }catch(error){
        console.error('Error finding categorie by id:', error);
        throw error;
    }
}

export const findCategorieAndDelete = async (Id, name) => {
    try {
        const categories = await Categorie.find({ user: Id });
        const existingCategory = categories.some(cat => cat.name === name);

        if (existingCategory) {
            // Use a different variable name to avoid redeclaration
            const deletedCategory = await Categorie.findOneAndDelete({ user: userId, name: name });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error finding and deleting category:', error);
        throw error;
    }
};
