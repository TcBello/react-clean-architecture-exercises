import { TaskEntity } from "../entities/task";
import { TaskRepository } from "../repositories/task";

export class UpdateTaskUsecase{
    private taskRepo: TaskRepository;
    constructor(taskRepo: TaskRepository){
        this.taskRepo = taskRepo;
    }

    updateTask(value: TaskEntity): boolean{
        return this.taskRepo.updateTask(value);
    }
}