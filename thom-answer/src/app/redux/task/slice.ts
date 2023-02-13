import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";
import { TaskLocalStorageDataRepository } from "../../../data/task_local_storage";
import { TaskEntity } from "../../../domain/entities/task";
import { AddTaskUsecase } from "../../../domain/usecases/add_task_usecase";

export interface TaskData{
    taskState: TaskState
}

export enum TaskState{
    loading,
    completed
}

let initialState: TaskData = {
    taskState: TaskState.loading
}

export const addTask = createAsyncThunk("task/addTask", async (data, { rejectWithValue }) => {
    const usecase = new AddTaskUsecase(new TaskLocalStorageDataRepository());
    try {
        const task = await Promise.resolve(usecase.addTask(new TaskEntity(uid(32), "data")));
        return task;
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTask.pending, (state, action) => {
            state.taskState = TaskState.loading;
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.taskState = TaskState.completed;
        });
        builder.addCase(addTask.rejected, (state, action) => {
            state.taskState = TaskState.completed;
        });
    },
});

const taskReducer = taskSlice.reducer;
export default taskReducer;