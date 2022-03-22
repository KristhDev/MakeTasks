import React, { useReducer, FC, useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import { CLOUDINARY_UPLOAD_PRESET } from '@env';

/* Context */
import TasksContext from './TasksContext';
import tasksReducer from './tasksReducer';

/* Hooks */
import useAuth from '../../hooks/useAuth';
import useStatus from '../../hooks/useStatus';

/* Utils */
import { rtdbErrorMessages } from '../../utils/errors';
import { uploadImage } from '../../utils/upload';

/* Interfaces */
import { Task, TasksState, TasksStatus, NewTask } from '../../interfaces/tasks';

/* Estado Inicial del contexto */
const INITIAL_STATE: TasksState = {
    tasks: [],
    selectedTasks: [],
    searchingTasks: [],
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
    },
    isTasksLoading: false
}

/* Base de datos en tiempo real del servicio de firebase */
const firebaseRTDB = database();

/* Provider para dar la información de las tareas */
const TasksProvider: FC = ({ children }) => {
    const [ state, dispatch ] = useReducer(tasksReducer, INITIAL_STATE);
    const { isConnected } = useNetInfo();

    const { user: { id: userId }, checkAuth } = useAuth();
    const { setMsgError, setMsgSuccess } = useStatus();

    /* Función para cargar las tareas */
    const loadTasks = async () => {
        /* Evaluar si hay conexión a internet */
        if (isConnected) {
            /* Verificar autenticación */
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return;
        }

        dispatch({ type: 'toggleIsTasksLoading' });

        try {
            const tasks: Task[] = [];
            const q = firebaseRTDB.ref(`/tasks/${ userId }`);

            /* Obtener las tareas */
            q.once('value', (snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((child): any => {
                        const task: Task = child.val();
                        tasks.push({ ...task, id: child.key || '' });
                    });
                }

                /* Ordenar tareas por fecha de creación */
                tasks.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);

                dispatch({ type: 'loadTasks', payload: { tasks } });
            });
        }
        catch (error) {
            console.log(error);

            /* Captura del error */
            const codeError = (error as any).code as keyof typeof rtdbErrorMessages;
            const msg = rtdbErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Setear error en StatusContext */
            setMsgError(msg);

            dispatch({ type: 'toggleIsTasksLoading' });
        }
    }

    /* Función para buscar las tareas */
    const searchTasks = (term: string) => {
        dispatch({ type: 'toggleIsTasksLoading' });

        /* Dilatarlo 300ms para dar mejor experiencia */
        setTimeout(() => {
            if (term) dispatch({ type: 'setSearchingTasks', payload: { term } });
            else {
                removeSearchingTasks();
                dispatch({ type: 'toggleIsTasksLoading' });
            }
        }, 300);
    }

    /* Función para cargar las tareas seleccionadas */
    const loadSelectedTasks = (type: 'all' | 'completed' | 'pending') => {
        dispatch({ type: 'toggleIsTasksLoading' });

        /* Dilatarlo 300ms para dar mejor experiencia */
        setTimeout(() => {
            dispatch({ type: 'setSelectedTasks', payload: { type } });
        }, 300);
    }

    /* Función para setear la tarea seleccionada */
    const setSelectedTask = (task: Task) => {
        dispatch({ type: 'setSelectedTask', payload: { task } });
    }

    /* Función para remover la tarea seleccionada */
    const removeSelectedTask = () => dispatch({ type: 'removeSelectedTask' });

    /* Función para remover las tareas */
    const removeTasks = () => dispatch({ type: 'removeTasks' });

    /* Función para remover las tareas buscadas */
    const removeSearchingTasks = () => dispatch({ type: 'removeSearchingTasks' });

    /* Función para crear una nueva tarea */
    const createTask = async (task: NewTask , type: TasksStatus, image?: string) => {
        /* Evaluar si hay conexión a internet */
        if (isConnected) {
            /* Verificar autenticación */
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return;
        }

        try {
            let imageUrl = '';

            /* Evaluar si hay una imagen */
            if (image) {
                /* Subir imagen a Cloudinary */
                const secureUrl = await uploadImage(image, CLOUDINARY_UPLOAD_PRESET);
                imageUrl = secureUrl;
            }

            const newTask = {
                user: userId,
                title: task.title,
                body: task.body,
                image: imageUrl,
                completed: false,
                finalDate: task.finalDate,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }

            /* Guardar tarea en la base de datos */
            const id = uuid.v4().toString();
            await firebaseRTDB.ref(`tasks/${ userId }/${ id }`).set(newTask);

            dispatch({ type: 'addTask', payload: { task: { ...newTask, id } } });
            dispatch({ type: 'setSelectedTasks', payload: { type } });

            /* Setear mensaje de éxito */
            setMsgSuccess('Tarea creada correctamente');
        }
        catch (error) {
            console.log(error);

            /* Captura del error */
            const codeError = (error as any).code as keyof typeof rtdbErrorMessages;
            const msg = rtdbErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Setear error en StatusContext */
            setMsgError(msg);
        }
    }

    /* Función para actualizar una tarea */
    const updateTask = async (task: Task, type: TasksStatus, image?: string) => {
        /* Evaluar si hay conexión a internet */
        if (isConnected) {
            /* Verificar autenticación */
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return;
        }

        try {
            let imageUrl = task?.image || '';

            /* Evaluar si hay una imagen */
            if (image) {
                /* Subir imagen a Cloudinary */
                const secureUrl = await uploadImage(image, CLOUDINARY_UPLOAD_PRESET);
                imageUrl = secureUrl;
            }

            const updateTask = {
                [`tasks/${ task.user }/${ task.id }`]: {
                    user: task.user,
                    title: task.title,
                    body: task.body,
                    image: imageUrl,
                    completed: task.completed,
                    finalDate: task.finalDate,
                    createdAt: task.createdAt,
                    updatedAt: Date.now()
                }
            }

            /* Actualizar tarea en la base de datos */
            await firebaseRTDB.ref().update(updateTask);

            dispatch({ type: 'updateTask', payload: { task: { ...task, image: imageUrl } } });
            dispatch({ type: 'setSelectedTasks', payload: { type } });

            /* Setear mensaje de éxito */
            setMsgSuccess('Tarea actualizada correctamente');
        }
        catch (error) {
            console.log(error);

            /* Captura del error */
            const codeError = (error as any).code as keyof typeof rtdbErrorMessages;
            const msg = rtdbErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Setear error en StatusContext */
            setMsgError(msg);
        }
    }

    /* Función para marcar como completa o incompleta una tarea */
    const toggleTaskCompeted = async (task: Task, type: TasksStatus) => {
        /* Evaluar si hay conexión a internet */
        if (isConnected) {
            /* Verificar autenticación */
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return;
        }

        try {
            const updateTask = {
                [`tasks/${ task.user }/${ task.id }`]: {
                    user: task.user,
                    title: task.title,
                    body: task.body,
                    image: task?.image || '',
                    completed: !task.completed, /* Poner el valor contrario al que tiene */
                    createdAt: task.createdAt,
                    updatedAt: Date.now()
                }
            }

            /* Actualizar tarea en la base de datos */
            await firebaseRTDB.ref().update(updateTask);

            dispatch({ 
                type: 'toggleCompletedTask',
                payload: { 
                    taskId: task.id,
                    completed: !task.completed
                } 
            });

            dispatch({ type: 'setSelectedTasks', payload: { type } });
        } 
        catch (error) {
            console.log(error);

            /* Captura del error */
            const codeError = (error as any).code as keyof typeof rtdbErrorMessages;
            const msg = rtdbErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Setear error en StatusContext */
            setMsgError(msg);
        }
    }

    /* Función para eliminar una tarea */
    const removeTask = async (taskId: string, type: TasksStatus) => {
        /* Evaluar si hay conexión a internet */
        if (isConnected) {
            /* Verificar autenticación */
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) return false;
        }

        try {
            /* Elimar tarea en la base de datos */
            await firebaseRTDB.ref(`tasks/${ userId }/${ taskId }`).remove();

            dispatch({ type: 'removeTask', payload: { taskId } });
            dispatch({ type: 'removeSelectedTask' });
            dispatch({ type: 'setSelectedTasks', payload: { type } });

            return true;
        }
        catch (error) {
            console.log(error);

            /* Captura del error */
            const codeError = (error as any).code as keyof typeof rtdbErrorMessages;
            const msg = rtdbErrorMessages[codeError] || 'Error en el serivdor, por favor intente más tarde';

            /* Setear error en StatusContext */
            setMsgError(msg);

            return false;
        }
    }

    /* Función para conectar base de datos en tiempo real en modo online u offline */
    const RTDBConnectionOnlineOrOffline = async () => {
        /* Verificar si hay conexión a internet */
        if (isConnected) await firebaseRTDB.goOnline();
        else await firebaseRTDB.goOffline();
    }

    /** 
     * useEffect para llamar la función RTDBConnectionOnlineOrOffline 
     * cada vez que la conexión cambie 
    */
    useEffect(() => {
        RTDBConnectionOnlineOrOffline();
    }, [ isConnected ]);

    return (
        <TasksContext.Provider 
            value={{  
                ...state,
                loadTasks,
                searchTasks,
                removeSearchingTasks,
                loadSelectedTasks,
                setSelectedTask,
                removeSelectedTask,
                removeTasks,
                createTask,
                updateTask,
                toggleTaskCompeted,
                removeTask
            }}
        >
            { children }
        </TasksContext.Provider>
    );
}

export default TasksProvider;