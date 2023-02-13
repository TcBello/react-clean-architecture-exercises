import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import taskReducer from "./redux/task/slice";
import reducerTodo from "./redux/todo/reducers";

export const store = legacy_createStore(
    combineReducers({
        reducerTodo,
        taskReducer
    }),
    applyMiddleware(thunk)
);