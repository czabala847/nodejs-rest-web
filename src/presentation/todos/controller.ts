import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { prisma } from "../../postgress"

// const todos = [
//   {
//     id: 1,
//     text: "Todo 1",
//     completedAt: new Date(),
//   },
//   {
//     id: 2,
//     text: "Todo 2",
//     completedAt: null,
//   },
//   {
//     id: 3,
//     text: "Todo 3",
//     completedAt: new Date(),
//   },
// ];

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // const todo = todos.find((todo) => todo.id === Number(id));

    // if (!todo) {
    //   return res.status(404).json({ message: "Todo not found" });
    // }

    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updated = await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto!.values,
    });

    return res.json(updated);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Id must be a number" });
    }

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    // const todoIndex = todos.findIndex((todo) => todo.id === id);

    // if (todoIndex === -1) {
    //   return res.status(404).json({ message: "Todo not found" });
    // }

    // todos.splice(todoIndex, 1);

    return res.json({ message: "Todo deleted" });
  };
}
