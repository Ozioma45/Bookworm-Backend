import mongoose from "mongoose";

const bookshelf = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bookshelf = mongoose.model("Bookshelf", bookshelf);

export default Bookshelf;
