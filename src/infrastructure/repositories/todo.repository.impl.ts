import {
    CreateTodoDto,
    TodoDataSource,
    TodoEntity,
    UpdateTodoDto,
} from "../../domain"
import { TodoRepository } from "../../domain/repositories/todo.repository"
export class TodoRepositoryImp implements TodoRepository {
  constructor(private readonly todoDataSource: TodoDataSource) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.create(createTodoDto);
  }
  async getAll(): Promise<TodoEntity[]> {
    return this.todoDataSource.getAll();
  }
  async findById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.findById(id);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.updateById(updateTodoDto);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.deleteById(id);
  }
}
