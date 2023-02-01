import { TaskEntity } from "../domain/entities/task";
import { TaskRepository } from "../domain/repositories/task";

export class TaskInMemory implements TaskRepository{
    private _tasks: TaskEntity[] = [];

    getAllTasks(): TaskEntity[] {
        return this._tasks;
    }
    getTask(): Promise<TaskEntity> {
        throw new Error("Method not implemented.");
    }
    addTask(value: TaskEntity): boolean {
        this._tasks.push(value);
        return true;
    }
    removeTask(value: TaskEntity): boolean {
        this._tasks.slice(this._tasks.indexOf(value), 1);
        return true;
    }
    updateTask(value: TaskEntity): boolean {
        throw new Error("Method not implemented.");
    }
}