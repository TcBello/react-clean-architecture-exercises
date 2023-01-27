import { storageGetItem, storageSetItem } from "../app/utils/local_storage";
import { TaskEntity } from "../domain/entities/task";
import { TaskRepository } from "../domain/repositories/task";

export class TaskDataRepository implements TaskRepository{
    getAllTasks(): TaskEntity[] {
        try{
            // GET THE CURRENT TASKS IN LOCAL STORAGE
            let currentTasks: TaskEntity[] = [];
            let storageData = storageGetItem('tasks');

            if(storageData != null){
                currentTasks = [JSON.parse(storageData)];
            }

            return currentTasks;
        }
        catch(e){
            console.log(`Something went wrong: ${e}`);
        }

        return [] as TaskEntity[];
    }
    async getTask(): Promise<TaskEntity> {
        throw new Error("Method not implemented.");
    }
    addTask(value: TaskEntity): boolean {
        try{
            // GET THE CURRENT TASKS IN LOCAL STORAGE
            let currentTasks: TaskEntity[] = [];
            let storageData = storageGetItem("tasks");

            if(storageData != null){
                currentTasks = [JSON.parse(storageData)];
            }

            // ADD NEW TASK
            currentTasks.push(value);
            
            // UPDATE THE TASKS IN THE LOCAL STORAGE
            storageSetItem('tasks', TaskEntity.toJSON(value));

            return true;
        }
        catch(e){
            console.log(`Something went wrong: ${e}`);
        }

        return false;
    }
    removeTask(value: TaskEntity): boolean {
        try{}
        catch(e){
            console.log(`Something went wrong: ${e}`);
        }

        return false;
    }
    updateTask(): boolean {
        try{}
        catch(e){
            console.log(`Something went wrong: ${e}`);
        }

        return false;
    }
}