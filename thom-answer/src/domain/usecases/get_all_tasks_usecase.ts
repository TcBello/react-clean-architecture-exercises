import { TaskEntity } from "../entities/task";
import { TaskRepository } from "../repositories/task";

export class GetAllTasksUsecase{
    private taskRepo: TaskRepository;
    constructor(taskRepo: TaskRepository){
        this.taskRepo = taskRepo;
    }

    getAllTasks(): TaskEntity[]{
        return this.taskRepo.getAllTasks();
    }
}