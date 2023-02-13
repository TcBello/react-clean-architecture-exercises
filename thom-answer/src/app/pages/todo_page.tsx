import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { TaskEntity } from "../../domain/entities/task";
import { uid } from "uid";
import { features } from "process";
import { Box } from "@mui/system";
import "./todo_page.css";
import { TaskLocalStorageDataRepository } from "../../data/task_local_storage";
import { AddTaskUsecase } from "../../domain/usecases/add_task_usecase";
import { TaskInMemoryDataRepository } from "../../data/task_in_memory";
import { RemoveTaskUsecase } from "../../domain/usecases/remove_task_usecase";
import { UpdateTaskUsecase } from "../../domain/usecases/update_task_usecase";
import { GetTaskUsecase } from "../../domain/usecases/get_task_usecase";
import { GetAllTasksUsecase } from "../../domain/usecases/get_all_tasks_usecase";
import { useDispatch } from "react-redux";
import { addTodo, getAllTodo, removeTodo, updateTodo } from '../redux/todo/actions';
import { addTask } from "../redux/task/slice";

enum TaskStorage{
    inMemory,
    localStorage
}

export const TodoPage = () => {
    const [title, setTitle] = useState("");
    const [taskId, setTaskId] = useState("");
    const [tasks, setTasks] = useState<TaskEntity[]>([]);
    const [isOpenModal, setModal] = useState(false);
    const [taskStorage, setTaskStorage] = useState(TaskStorage.localStorage);
    
    const dispatch = useDispatch();

    const addTaskUsecase = new AddTaskUsecase(taskStorage == TaskStorage.inMemory
        ? new TaskInMemoryDataRepository()
        : new TaskLocalStorageDataRepository()
    );
    const removeTaskUsecase = new RemoveTaskUsecase(taskStorage == TaskStorage.inMemory
        ? new TaskInMemoryDataRepository()
        : new TaskLocalStorageDataRepository()
    );
    const updateTaskUsecase = new UpdateTaskUsecase(taskStorage == TaskStorage.inMemory
        ? new TaskInMemoryDataRepository()
        : new TaskLocalStorageDataRepository()
    );
    const getTaskUsecase = new GetTaskUsecase(taskStorage == TaskStorage.inMemory
        ? new TaskInMemoryDataRepository()
        : new TaskLocalStorageDataRepository()
    );
    const getAllTaskUsecase = new GetAllTasksUsecase(taskStorage == TaskStorage.inMemory
        ? new TaskInMemoryDataRepository()
        : new TaskLocalStorageDataRepository()
    );

    async function changeTaskStorage(){
        if(taskStorage == TaskStorage.inMemory){
            setTaskStorage(TaskStorage.localStorage);
        }

        if(taskStorage == TaskStorage.localStorage){
            setTaskStorage(TaskStorage.inMemory);
        }

        fetchAllTasks();
    }

    function add() {
        let result = false;

        if (title != "") {
            // result = addTaskUsecase.addTask(new TaskEntity(uid(32), title));
            dispatch(addTodo(new TaskEntity(uid(32), title)) as any);
            // dispatch(addTask() as any);
            fetchAllTasks();
        }

        if (result) {
            setTitle("");
        }
    }

    function fetchAllTasks() {
        const currentTasks = getAllTaskUsecase.getAllTasks();
        setTasks(currentTasks);
        console.log(currentTasks);
    }

    function remove(value: TaskEntity) {
        // const result = removeTaskUsecase.removeTask(value);
        dispatch(removeTodo(value) as any);
        fetchAllTasks();

        // if (result) fetchAllTasks();
    }

    function update() {
        if (!taskId) return;

        // const result = updateTaskUsecase.updateTask(new TaskEntity(taskId, title));
        dispatch(updateTodo(new TaskEntity(taskId, title)) as any);
        fetchAllTasks();
        setModal(false);
        setTaskId("")
        // if (result) {
        //     fetchAllTasks();
        //     setModal(false);
        //     setTaskId("")
        // }
    }

    useEffect(() => {
        fetchAllTasks();
    }, [taskStorage]);

    return (
        <>
            {/* MODAL */}
            <Modal open={isOpenModal} onClose={() => setModal(false)}>
                <Box className="modal">
                    <div className="modal-content-container">
                        {/* TASK INPUT FIELD */}
                        <TextField id="filled-basic" label="Add New Todo" variant="filled" className='task-input' onChange={(e) => { setTitle(e.target.value) }} />
                        <div style={{ height: 30 }}></div>
                        {/* UDPATE BUTTON */}
                        <Button variant="contained" style={{ width: 150, height: 50, backgroundColor: '#0052A2', marginLeft: 5, marginRight: 5 }} onClick={() => update()}>Update Task</Button>
                    </div>
                </Box>
            </Modal>
            <div className='background-gradient'>
                <div className='content-center'>
                    {/* CHANGE TASK STORAGE BUTTON */}
                <Button variant="contained" style={{ width: '15%', height: 50, backgroundColor: '#0052A2' }} onClick={changeTaskStorage}>Change Task Storage</Button>
                <p style={{width: 'auto', height: 50, padding: 5, color: "white"}}><b>Task Storage:</b> {taskStorage == TaskStorage.inMemory ? "In Memory" : "Local Storage"}</p>
                    <div className='todo-container'>
                        {/* TODO FIELD */}
                        <TextField id="filled-basic" label="Add New Todo" variant="filled" className='todo-input' onChange={(e) => { setTitle(e.target.value) }} />
                        {/* ADD BUTTON */}
                        <Button variant="contained" style={{ width: '20%', backgroundColor: '#0052A2' }} onClick={add}>Add</Button>
                    </div>
                    <div className='todo-content-container'>
                        <div className='table-container'>
                            <Table sx={{ minWidth: 650, minHeight: 100 }} aria-label="simple table">
                                {/* TABLE HEADER */}
                                <TableHead style={{ height: 50, backgroundColor: "#02386E" }}>
                                    <TableRow>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                                        <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* TABLE CONTENT */}
                                <TableBody style={{ height: 50 }}>
                                    {tasks.map((value, index) => {
                                        return (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{value['title']}</TableCell>
                                                <TableCell>
                                                    <div className='action-buttons-container'>
                                                        {/* UPDATE BUTTON */}
                                                        <Button variant="contained" style={{ width: 60, height: 50, backgroundColor: '#0052A2', marginLeft: 5, marginRight: 5 }} onClick={() => { setModal(true); setTaskId(value["id"]); }}>Update</Button>
                                                        {/* DELETE BUTTON */}
                                                        <Button variant="contained" style={{ width: 60, height: 50, backgroundColor: '#B41C1C', marginLeft: 5, marginRight: 5 }} onClick={() => remove(value)}>Remove</Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}