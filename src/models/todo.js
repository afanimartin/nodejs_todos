import mongoose from "mongoose";
import { User } from "./user.js";

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    trim: true,
    required: true,
  },
  isComplete: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
});

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export { Todo, todoSchema };
