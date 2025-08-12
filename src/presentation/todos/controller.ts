import { Request, Response } from "express"

const todos = [
  {
    id: 1,
    title: "Todo 1",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Todo 2",
    createdAt: null,
  },
  {
    id: 3,
    title: "Todo 3",
    createdAt: new Date(),
  },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json(todo);
  };
}
