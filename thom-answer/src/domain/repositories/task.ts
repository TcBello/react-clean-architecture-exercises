import { TaskEntity } from "../entities/task";

export interface TaskRepository{
    getAllTasks(): TaskEntity[];
    getTask(id: string): TaskEntity | null;
    addTask(value: TaskEntity): boolean;
    removeTask(value: TaskEntity): boolean;
    updateTask(value: TaskEntity): boolean;
}