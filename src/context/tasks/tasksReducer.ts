
/* Interfaces */
import { Task, TaskAction, TasksState } from '../../interfaces/tasks';

/* Reducer para manejar el state de las tareas */
const tasksReducer = (state: TasksState, action: TaskAction) => {
    switch (action.type) {
        /* Cargar tareas */
        case 'loadTasks':
            return {
                ...state,
                tasks: [ ...action.payload.tasks ],
                selectedTasks: [ ...action.payload.tasks ],
                isTasksLoading: false
            }

        /* Setear tareas buscadas */
        case 'setSearchingTasks':
            const searchingTasks = state.tasks.filter(
                t => 
                    t.title.toLowerCase().includes(action.payload.term.toLowerCase())
                    || t.body.toLowerCase().includes(action.payload.term.toLowerCase())
            );

            return {
                ...state,
                searchingTasks: searchingTasks,
                isTasksLoading: false
            }

        /* Setear una tarea seleccionada */
        case 'setSelectedTask':
            return {
                ...state,
                selectedTask: { ...action.payload.task }
            }

        /* Setear tareas seleccionadas */
        case 'setSelectedTasks':
            const tasks: Task[] = [];

            if (action.payload.type === 'all') tasks.push(...state.tasks);
            else if (action.payload.type === 'completed') {
                tasks.push(...state.tasks.filter(task => task.completed));
            }
            else if (action.payload.type === 'pending') {
                tasks.push(...state.tasks.filter(task => !task.completed));
            }

            return {
                ...state,
                selectedTasks: [ ...tasks ],
                isTasksLoading: false
            }

        /* Remover las taraeas */
        case 'removeTasks':
            return {
                ...state,
                tasks: [],
                selectedTasks: [],
                searchingTasks: []  
            }

        /* Remover las tareas buscadas */
        case 'removeSearchingTasks':
            return {
                ...state,
                searchingTasks: []
            }

        /* Agregar tarea */
        case 'addTask':
            return {
                ...state,
                tasks: [ action.payload.task, ...state.tasks ]
            }

        /* Actualizar tarea */
        case 'updateTask':
            return {
                ...state,
                tasks: state.tasks.map(
                    t => t.id === action.payload.task.id ? action.payload.task : t
                ),
                selectedTask: {
                    ...action.payload.task,
                }
            }

        /* Cambiar tarea de completa a imcompleta o al inversa */
        case 'toggleCompletedTask':
            return {
                ...state,
                tasks: state.tasks.map(
                    t => t.id === action.payload.taskId 
                        ? { ...t, completed: action.payload.completed } 
                        : t
                )
            }

        /* Remover tarea */
        case 'removeTask':
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload.taskId)
            }

        /* Remover tarea seleccionada */
        case 'removeSelectedTask':
            return {
                ...state,
                selectedTask: {
                    id: '',
                    user: '',
                    title: '',
                    body: '',
                    image: '',
                    completed: false,
                    finalDate: 0,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }
            }

        /* Mostrar carga de tareas */
        case 'toggleIsTasksLoading':
            return {
                ...state,
                isTasksLoading: !state.isTasksLoading
            }

        /* Retornar state por defecto */
        default:
            return state;
    }
}

export default tasksReducer;