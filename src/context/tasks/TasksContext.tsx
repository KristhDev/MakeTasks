import { createContext } from 'react';

/* Interfaces */
import { Task, TasksStatus, NewTask } from '../../interfaces/tasks';

/**
 * Definicion del tipo para las propiedades del 
 * Contexto de Tareas 
*/

/**  
 * Este contexto se usa para manejar la información de autenticación,
 * se conforma de las siguientes propiedades:
 *
 * tasks: sirve para guardar las tareas
 * selectedTasks: sirve para guardar las tareas seleccionadas
 * searchingTasks: sirve para guardar las tareas buscadas
 * selectedTask: sirve para guardar la tarea seleccionada
 * isTasksLoading: sirve para manejar la carga de las tareas
 * loadTasks: función para cargar las tareas
 * loadSelectedTasks: función para cargar las tareas seleccionadas
 * searchTasks: función para buscar las tareas
 * removeSearchingTasks: función para limpiar las tareas buscadas
 * setSelectedTask: función para guardar la tarea seleccionada
 * removeSelectedTask: función para limpiar la tarea seleccionada
 * removeTasks: función para limpiar las tareas
 * createTask: función para crear una tarea
 * updateTask: función para actualizar una tarea
 * toggleTaskCompleted: función para cambiar el estado de completado de una tarea
 * removeTask: función para eliminar una tarea
*/

export type TasksContextProps = {
    tasks: Task[];
    selectedTasks: Task[];
    searchingTasks: Task[];
    selectedTask: Task;
    isTasksLoading: boolean;
    loadTasks: () => Promise<void>;
    loadSelectedTasks: (type: TasksStatus) => void;
    searchTasks: (term: string) => void;
    removeSearchingTasks: () => void;
    setSelectedTask: (task: Task) => void;
    removeSelectedTask: () => void;
    removeTasks: () => void;
    createTask: (task: NewTask, type: TasksStatus, image?: string) => Promise<void>;
    updateTask: (task: Task, type: TasksStatus, image?: string) => Promise<void>;
    toggleTaskCompeted: (task: Task, type: TasksStatus) => Promise<void>;
    removeTask: (taskId: string, type: TasksStatus) => Promise<boolean>;
}

/* Creación del contexto */
const TasksContext = createContext<TasksContextProps>({} as TasksContextProps);

export default TasksContext;