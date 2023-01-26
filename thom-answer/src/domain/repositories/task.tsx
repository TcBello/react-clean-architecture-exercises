import { TaskEntity } from "../entities/task";

export interface TaskRepository{
    getAllTasks(): Promise<TaskEntity[]>;
    getTask(): Promise<TaskEntity>;
    addTask(): Promise<boolean>;
    removeTask(): Promise<boolean>;
    updateTask(): Promise<boolean>;
}