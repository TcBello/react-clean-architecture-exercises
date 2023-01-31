import { TaskEntity } from "../domain/entities/task";
import { TaskRepository } from "../domain/repositories/task";
import { storageGetItem, storageSetItem } from "./utils/local_storage";

export class TaskDataRepository implements TaskRepository{
    getAllTasks(): TaskEntity[] {
        try{
            // GET THE CURRENT TASKS IN LOCAL STORAGE
            let currentTasks: TaskEntity[] = [];
            let storageData = storageGetItem('tasks');

            if(storageData != null){
                currentTasks = JSON.parse(storageData);
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
            let currentTasks = [];
            let storageData = storageGetItem("tasks");

            if(storageData != null){
                currentTasks = JSON.parse(storageData);
            }

            // ADD NEW TASK
            currentTasks.push(TaskEntity.toJSON(value));
            
            // UPDATE THE TASKS IN THE LOCAL STORAGE
            storageSetItem('tasks', JSON.stringify(currentTasks));

            return true;
        }
        catch(e){
            console.log(`Something went wrong: ${e}`);
        }

        return false;
    }
    removeTask(value: TaskEntity): boolean {
        try{
            // GET THE CURRENT TASKS IN LOCAL STORAGE
            let currentTasks: TaskEntity[] = [];
            const storageData = storageGetItem("tasks");

            if(storageData != null){
                currentTasks = JSON.parse(storageData) as TaskEntity[];
            }

            // GET THE DATA IN THE LOCAL STORAGE BY LOOPING AND COMPARING
            // THE TASK ENTITIES BY ID
            currentTasks.forEach(element => {
                if(element['id'] == value['id']){
                    // REMOVE THE TASK IN THE LIST
                    currentTasks.splice(currentTasks.indexOf(element), 1);
                    
                    // UPDATE THE TASKS IN THE LOCAL STORAGE
                    storageSetItem('tasks', JSON.stringify(currentTasks));
                }
            });

            return true;
        }
        catch(e){
            console.log(`Something went wrong: ${e}`);
        }

        return false;
    }
    updateTask(value: TaskEntity): boolean {
        try{
            // GET THE CURRENT TASKS IN LOCAL STORAGE
            let currentTasks: TaskEntity[] = [];
            const storageData = storageGetItem("tasks");

            if(storageData != null){
                currentTasks = JSON.parse(storageData) as TaskEntity[];
            }

            // GET THE DATA IN THE LOCAL STORAGE BY LOOPING AND COMPARING
            // THE TASK ENTITIES BY ID
            currentTasks.forEach(element => {
                if(element['id'] == value['id']){
                    // REPLACE THE TASK IN THE LIST
                    currentTasks.splice(currentTasks.indexOf(element), 1, value);
                    
                    // // UPDATE THE TASKS IN THE LOCAL STORAGE
                    storageSetItem('tasks', JSON.stringify(currentTasks));
                }
            });

            return true
        }
        catch(e){
            console.log(`Something went wrong: ${e}`);
        }

        return false;
    }
}