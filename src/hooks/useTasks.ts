import { useContext } from 'react';
import TasksContext from '../context/tasks/TasksContext';

/**
 * Hook para devolver todo el state y funciones del Contexto 
 * de las Tareas
*/
const useTasks = () => useContext(TasksContext);

export default useTasks;