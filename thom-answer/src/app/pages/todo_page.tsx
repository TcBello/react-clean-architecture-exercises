import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { TaskEntity } from "../../domain/entities/task";
import { uid } from "uid";
import { features } from "process";
import { Box } from "@mui/system";
import "./todo_page.css";
import { TaskLocalStorageDataRepository } from "../../data/task_local_storage";

export const TodoPage = () => {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState<TaskEntity[]>([]);
    const [isOpenModal, setModal] = useState(false);
    const taskRepo = new TaskLocalStorageDataRepository();

    function add(){
        let result = false;

        if(title != ""){
            result = taskRepo.addTask(new TaskEntity(uid(32), title));
            fetchAllTasks();
        }

        if(result){
            setTitle("");
        }
    }

    function fetchAllTasks(){
        const currentTasks = taskRepo.getAllTasks();
        setTasks(currentTasks);
    }

    function remove(value: TaskEntity){
        const result = taskRepo.removeTask(value);

        if(result)  fetchAllTasks();
    }

    function update(value: TaskEntity){
        const result = taskRepo.updateTask(value);

        if(result){
            fetchAllTasks();
            setModal(false);
        }
    }

    useEffect(() => {
        fetchAllTasks();
    }, []);
    
    return (
        <div className='background-gradient'>
            <div className='content-center'>
                <div className='todo-container'>
                    {/* TODO FIELD */}
                    <TextField id="filled-basic" label="Add New Todo" variant="filled" className='todo-input' onChange={(e) => {setTitle(e.target.value)}} />
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
                                                    <Button variant="contained" style={{ width: 60, height: 50, backgroundColor: '#0052A2', marginLeft: 5, marginRight: 5 }} onClick={() => setModal(true)}>Update</Button>
                                                    {/* MODAL */}
                                                    <Modal open={isOpenModal} onClose={() => setModal(false)}>
                                                        <Box className="modal">
                                                            <div className="modal-content-container">
                                                                {/* TASK INPUT FIELD */}
                                                                <TextField id="filled-basic" label="Add New Todo" variant="filled" className='task-input' onChange={(e) => {setTitle(e.target.value)}} />
                                                                <div style={{height: 30}}></div>
                                                                {/* UDPATE BUTTON */}
                                                                <Button variant="contained" style={{ width: 150, height: 50, backgroundColor: '#0052A2', marginLeft: 5, marginRight: 5 }} onClick={() => update(new TaskEntity(value['id'], title))}>Update Task</Button>
                                                            </div>
                                                        </Box>
                                                    </Modal>
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
    );
}