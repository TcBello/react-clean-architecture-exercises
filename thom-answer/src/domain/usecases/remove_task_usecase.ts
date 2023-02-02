import { TaskEntity } from "../entities/task";
import { TaskRepository } from "../repositories/task";

export class RemoveTaskUsecase{
    private taskRepo: TaskRepository;
    constructor(taskRepo: TaskRepository){
        this.taskRepo = taskRepo;
    }

    removeTask(value: TaskEntity): boolean{
        return this.taskRepo.removeTask(value);
    }
}