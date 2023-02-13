import { TaskState } from "../task/slice";
import { AddTodoState } from "./types";

const initialState = {
    taskState: TaskState.loading,
};

// NOTE: any is not a good practice
// You can refer to this document if you want TypeScript
export default function reducerTodo(state = initialState, action: any) {
    switch (action.type) {
        case AddTodoState.request: {
            return { ...state, taskState: TaskState.loading }
        }
        case AddTodoState.success: {
            return { ...state, taskState: TaskState.completed }
        }
        case AddTodoState.failure: {
            return { ...state, taskState: TaskState.completed }
        }
        default: {
            return state
        }
    }
}