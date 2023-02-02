import { TaskEntity } from "../entities/task";
import { TaskRepository } from "../repositories/task";

export class GetTaskUsecase{
    private taskRepo: TaskRepository;
    constructor(taskRepo: TaskRepository){
        this.taskRepo = taskRepo;
    }

    getTask(id: string): TaskEntity | null{
        return this.taskRepo.getTask(id);
    }
}