import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export const TodoPage = () => {
    return (
        <div className='background-gradient'>
            <div className='content-center'>
                <div className='todo-container'>
                    {/* TODO FIELD */}
                    <TextField id="filled-basic" label="Add New Todo" variant="filled" className='todo-input' />
                    {/* TODO INPUT */}
                    <Button variant="contained" style={{ width: '20%', backgroundColor: '#0052A2' }}>Add</Button>
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
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>1st Todo Title</TableCell>
                                    <TableCell>
                                        <div className='action-buttons-container'>
                                            <Button variant="contained" style={{ width: 60, height: 50, backgroundColor: '#0052A2', marginLeft: 5, marginRight: 5 }}>Update</Button>
                                            <Button variant="contained" style={{ width: 60, height: 50, backgroundColor: '#B41C1C', marginLeft: 5, marginRight: 5 }}>Remove</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}