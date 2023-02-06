import { TaskEntity } from "../domain/entities/task";
import { TaskRepository } from "../domain/repositories/task";

export class TaskInMemoryDataRepository implements TaskRepository{
    private _tasks: TaskEntity[] = [];

    getAllTasks(): TaskEntity[] {
        return this._tasks;
    }
    getTask(id: string): TaskEntity | null {
        let task: TaskEntity | null = null;

        this._tasks.forEach(element => {
            if(element['id'] == id){
                task = element;
            }
        });

        return task;
    }
    addTask(value: TaskEntity): boolean {
        this._tasks.push(value);
        return true;
    }
    removeTask(value: TaskEntity): boolean {
        this._tasks.forEach(element => {
            if(element['id'] == value['id']){
                const indexElement = this._tasks.indexOf(element);

                this._tasks.splice(indexElement, 1);
            }
        });
        return true;
    }
    updateTask(value: TaskEntity): boolean {
        this._tasks.forEach(element => {
            if(element['id'] == value['id']){
                const indexElement = this._tasks.indexOf(element);

                this._tasks[indexElement] = value;
            }
        });
        return true;
    }
}