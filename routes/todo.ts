import express from "express";
import { addTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo";

const router = express.Router();

router.route("/").post(addTodo).get(getTodos);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

export default router;
