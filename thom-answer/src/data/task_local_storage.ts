import { TaskEntity } from "../domain/entities/task";
import { TaskRepository } from "../domain/repositories/task";

export class TaskLocalStorageDataRepository implements TaskRepository{
    async getAllTasks(): Promise<TaskEntity[]> {
        throw new Error("Method not implemented.");
    }
    async getTask(): Promise<TaskEntity> {
        throw new Error("Method not implemented.");
    }
    async addTask(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async removeTask(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async updateTask(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}