
/* Interfaz para el state del contexto de tareas */
export interface TasksState {
    tasks: Task[];
    selectedTasks: Task[];
    searchingTasks: Task[];
    selectedTask: Task;
    isTasksLoading: boolean;
}

/* Tipo para definir los tipos de acciones del reducer de las tareas */
export type TaskAction = 
    { type: 'loadTasks', payload: { tasks: Task[] } }
    | { type: 'setSearchingTasks', payload: { term: string } }
    | { type: 'setSelectedTasks', payload: { type: TasksStatus } }
    | { type: 'removeTasks' }
    | { type: 'removeSearchingTasks' }
    | { type: 'addTask', payload: { task: Task } }
    | { type: 'updateTask', payload: { task: Task } }
    | { type: 'toggleCompletedTask', payload: { taskId: string, completed: boolean } }
    | { type: 'removeTask', payload: { taskId: string } }
    | { type: 'setSelectedTask', payload: { task: Task } }
    | { type: 'removeSelectedTask' }
    | { type: 'toggleIsTasksLoading' }

export type TasksStatus = 'all' | 'completed' | 'pending';

export interface NewTask {
    title: string;
    body: string;
    finalDate: number;
}

export interface Task {
    id: string;
    user: string;
    title: string;
    body: string;
    image?: string;
    completed: boolean;
    finalDate: number;
    createdAt: number;
    updatedAt: number;
}