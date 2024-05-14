import mongoose from "mongoose";
import Bookshelf from "../model/bookShelf.js";

export const saveBookshelf = async (req, res) => {
  const { name, author, genre, description, image, categorie } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!genre) {
    emptyFields.push("genre");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!image) {
    emptyFields.push("image");
  }
  if (!categorie) {
    emptyFields.push("description");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }

  //add doc to db
  try {
    const user_id = req.user._id;
    const bookShelf = await Bookshelf.create({
      name,
      author,
      genre,
      description,
      image,
      categorie,
      user_id,
    });
    res.status(200).json(bookShelf);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookshelfByUser = async (req, res) => {
  const user_id = req.user._id;

  const bookShelf = await Bookshelf.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(bookShelf);
};

export const deleteBookshelf = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Bookshelf not found" });
  }

  const bookShelf = await Bookshelf.findOneAndDelete({ _id: id });

  if (!bookShelf) {
    return res.status(404).json({ error: "Bookshelf not found" });
  }

  res.status(200).json(bookShelf);
};
