import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { TaskDataRepository } from "../../data/task";
import { TaskEntity } from "../../domain/entities/task";
import { uid } from "uid";
import { features } from "process";

export const TodoPage = () => {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState<TaskEntity[]>([]);
    const taskRepo = new TaskDataRepository();

    function add(){
        let result = false;

        if(title != ""){
            setTasks([...tasks, new TaskEntity(uid(32), title)]);
            result = taskRepo.addTask(tasks);
        }

        if(result){
            setTitle("");
        }
    }

    function fetchAllTasks(){
        const currentTasks = taskRepo.getAllTasks();
        setTasks(currentTasks);
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
                    {/* TODO INPUT */}
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
                                                    <Button variant="contained" style={{ width: 60, height: 50, backgroundColor: '#0052A2', marginLeft: 5, marginRight: 5 }}>Update</Button>
                                                    <Button variant="contained" style={{ width: 60, height: 50, backgroundColor: '#B41C1C', marginLeft: 5, marginRight: 5 }}>Remove</Button>
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