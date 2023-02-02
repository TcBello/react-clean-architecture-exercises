import { TaskEntity } from "../entities/task";
import { TaskRepository } from "../repositories/task";

export class AddTaskUsecase{
    private taskRepo: TaskRepository;
    constructor(taskRepo: TaskRepository){
        this.taskRepo = taskRepo;
    }

    addTask(value: TaskEntity): boolean{
        return this.taskRepo.addTask(value);
    }
}