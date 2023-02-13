import { uid } from "uid";
import { TaskLocalStorageDataRepository } from "../../../data/task_local_storage";
import { TaskEntity } from "../../../domain/entities/task";
import { AddTaskUsecase } from "../../../domain/usecases/add_task_usecase";
import { GetAllTasksUsecase } from "../../../domain/usecases/get_all_tasks_usecase";
import { RemoveTaskUsecase } from "../../../domain/usecases/remove_task_usecase";
import { UpdateTaskUsecase } from "../../../domain/usecases/update_task_usecase";
import { AddTodoState } from "./types";

const _repository = new TaskLocalStorageDataRepository();

export function addTodo(entity: TaskEntity) {
    return async function (dispatch: any) {
        dispatch({ type: AddTodoState.request })
        try {
            const usecase = new AddTaskUsecase(_repository);
            usecase.addTask(entity);
            dispatch({ type: AddTodoState.success })
        } catch (err) {
            dispatch({ type: AddTodoState.failure })
        }
    }
}

export function removeTodo(entity: TaskEntity) {
    return async function (dispatch: any) {
        dispatch({ type: AddTodoState.request })
        try {
            const usecase = new RemoveTaskUsecase(_repository);
            usecase.removeTask(entity);
            dispatch({ type: AddTodoState.success })
        } catch (err) {
            dispatch({ type: AddTodoState.failure })
        }
    }
}

export function updateTodo(entity: TaskEntity) {
    return async function (dispatch: any) {
        dispatch({ type: AddTodoState.request })
        try {
            const usecase = new UpdateTaskUsecase(_repository);
            usecase.updateTask(entity);
            dispatch({ type: AddTodoState.success })
        } catch (err) {
            dispatch({ type: AddTodoState.failure })
        }
    }
}

export function getAllTodo() {
    return function (dispatch: any) {
        dispatch({ type: AddTodoState.request })
        try {
            const usecase = new GetAllTasksUsecase(_repository);
            dispatch({ type: AddTodoState.success })
            return usecase.getAllTasks;
        } catch (err) {
            dispatch({ type: AddTodoState.failure })
        }
    }
}