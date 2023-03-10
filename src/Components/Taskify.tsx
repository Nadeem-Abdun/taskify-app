import React, { useState } from 'react';
import { Box, Card, InputBase, Stack, Typography, Button, IconButton, Snackbar, Alert } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';


interface Task {
    id: number;
    text: string;
    isCompleted: boolean;
}

export default function Taskify() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    // Task input event func
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Task input form func
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputValue) return (setOpenSnack(true));

        const newTask: Task = {
            id: Date.now(),
            text: inputValue,
            isCompleted: false,
        };

        setTasks([...tasks, newTask]);
        setInputValue('');
    };

    // Task done func
    const handleToggleTask = (id: number) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, isCompleted: !task.isCompleted }
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    // Task delete func
    const handleDeleteTask = (id: number) => {
        const filterTasks = tasks.filter((task) => {
            return (
                task.id !== id
            )
        });
        setTasks(filterTasks);
    }
    // Snackbar close func
    const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    return (
        <>
            {/* WebView */}
            <Box height='70%' width='40%' sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }} justifyContent='center' alignItems='flex-start' borderRadius={3} bgcolor='#f1f2f4' paddingY={1}>
                <Stack height='100%' width='100%' direction='column' spacing={1} display='flex' justifyContent='center' alignItems='center'>
                    <Box height='10%' width='80%' display='flex' justifyContent='center' alignItems='center'>
                        <Typography component='h1' fontSize='1.5rem' fontWeight='600' fontFamily='Poppins'>Taskify</Typography>
                    </Box>
                    <Stack height='20%' width='80%' direction='column' spacing={1} display='flex' justifyContent='center' alignItems='center' component='form' onSubmit={handleFormSubmit}>
                        <InputBase type='text' value={inputValue} onChange={handleInputChange} placeholder='Type your task here..' sx={{ bgcolor: '#ffffff', borderRadius: 2, padding: '0.5rem' }} fullWidth />
                        <Button type='submit' variant='contained' color='success' sx={{ textTransform: 'initial', fontWeight: 600 }}>Add To List</Button>
                    </Stack>
                    <Stack height='70%' width='80%' direction='column' spacing={1} display='flex' justifyContent='flex-start' alignItems='center'>
                        {tasks.map((task) => (
                            <Card key={task.id} sx={{ height: '2.5rem', width: '100%', display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
                                <Stack height='100%' width='95%' direction='row' display='flex' justifyContent='space-between' alignItems='center'>
                                    <Typography component='h2' fontSize='1rem' fontFamily='Poppins' style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', cursor: 'pointer' }}>
                                        {task.text}
                                    </Typography>
                                    <Box>
                                        <IconButton color='secondary' onClick={() => { handleToggleTask(task.id) }}><CheckCircleOutlineOutlinedIcon /></IconButton>
                                        <IconButton color='error' onClick={() => { handleDeleteTask(task.id) }}><DeleteOutlinedIcon /></IconButton>
                                    </Box>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            </Box>
            {/* MobView */}
            <Box height='70%' width='85%' sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }} justifyContent='center' alignItems='flex-start' borderRadius={3} bgcolor='#f1f2f4' paddingY={1}>
                <Stack height='100%' width='100%' direction='column' spacing={1} display='flex' justifyContent='center' alignItems='center'>
                    <Box height='10%' width='90%' display='flex' justifyContent='center' alignItems='center'>
                        <Typography component='h1' fontSize='1.5rem' fontWeight='600' fontFamily='Poppins' >Taskify</Typography>
                    </Box>
                    <Stack height='20%' width='90%' direction='column' spacing={1} display='flex' justifyContent='center' alignItems='center' component='form' onSubmit={handleFormSubmit}>
                        <InputBase type='text' value={inputValue} onChange={handleInputChange} placeholder='Type your task here..' sx={{ bgcolor: '#ffffff', borderRadius: 2, padding: '0.5rem' }} fullWidth />
                        <Button type='submit' variant='contained' color='success'>Add To List</Button>
                    </Stack>
                    <Stack height='70%' width='90%' direction='column' spacing={1} display='flex' justifyContent='flex-start' alignItems='center'>
                        {tasks.map((task) => (
                            <Card key={task.id} sx={{ height: '2.5rem', width: '100%', display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
                                <Stack height='100%' width='95%' direction='row' display='flex' justifyContent='space-between' alignItems='center'>
                                    <Typography component='h2' fontSize='1rem' fontFamily='Poppins' style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', cursor: 'pointer', wordWrap: 'break-word' }}>
                                        {task.text.slice(0, 21)}
                                    </Typography>
                                    <Box>
                                        <IconButton color='secondary' sx={{ padding: '0.2rem' }} onClick={() => { handleToggleTask(task.id) }}><CheckCircleOutlineOutlinedIcon /></IconButton>
                                        <IconButton color='error' sx={{ padding: '0.2rem' }} onClick={() => { handleDeleteTask(task.id) }}><DeleteOutlinedIcon /></IconButton>
                                    </Box>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            </Box>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                    Please Type Something To Add..
                </Alert>
            </Snackbar>
        </>
    )
}
