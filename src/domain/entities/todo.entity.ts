export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt?: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = object;

    let newCompletedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (isNaN(newCompletedAt.getTime())) {
        throw new Error("CompletedAt is invalid");
      }
    }

    return new TodoEntity(id, text, newCompletedAt);
  }
}
