import express from 'express';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../controllers/todoController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);
router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);

export default router;
