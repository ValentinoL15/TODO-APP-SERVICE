const express = require('express');
require('dotenv').config();
const router = express.Router();
const TasksController = require('../controllers/taskController')

router.get('/get-tasks', TasksController.getAllTasks);

router.get('/get-task/:id', TasksController.getTaskById);

router.post('/create-task', TasksController.createTask);

router.put('/update-task/:id', TasksController.updateTask);

router.delete('/delete-task/:id', TasksController.deleteTask);

module.exports = router