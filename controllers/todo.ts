import { Request, Response } from "express";
import Validator from "validator";

import Todo from "../models/Todo";

export const addTodo = async (req: Request, res: Response) => {
  try {
    if (!req.body.title || Validator.isEmpty(req.body.title))
      throw { title: "Todo name is required" };

    const newTodo = new Todo({
      title: req.body.title,
    });

    const todo = await newTodo.save();
    res.status(200).json({ success: true, data: todo });
  } catch (err: any) {
    res.status(500).json({ success: false, err });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().lean();
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    if (!req.body.title || Validator.isEmpty(req.body.title))
      throw { title: "Todo name is required" };

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { title: req.body.title } },
      { new: true }
    );
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Todo Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};
