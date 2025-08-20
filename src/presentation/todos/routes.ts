import { Router } from "express"
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl"
import { TodoRepositoryImp } from "../../infrastructure/repositories/todo.repository.impl"
import { TodosController } from "./controller"

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDataSourceImpl();
    const todoRepository = new TodoRepositoryImp(datasource);
    const todoController = new TodosController(todoRepository);

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
