import { TaskEntity } from "../entities/task";

export interface TaskRepository{
    getAllTasks(): TaskEntity[];
    getTask(): Promise<TaskEntity>;
    addTask(value: TaskEntity[]): boolean;
    removeTask(value: TaskEntity): boolean;
    updateTask(value: TaskEntity): boolean;
}