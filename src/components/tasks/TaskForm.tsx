import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImageView from 'react-native-image-viewing';
import { object, string, number } from 'yup';
import dayjs from 'dayjs';

/* Screens */
import ModalScreen from '../../screens/ui/ModalScreen';

/* Components */
import { TaskDeleteModal } from './TaskDeleteModal';
import { Fab } from '../ui/Fab';

/* Hooks */
import useForm from '../../hooks/useForm';
import useImage from '../../hooks/useImage';
import useStatus from '../../hooks/useStatus';
import useTasks from '../../hooks/useTasks';

/* Interfaces */
import { TasksStatus } from '../../interfaces/tasks';
import { TasksNavigatorParams } from '../../navigation/TasksNavigator';

/* Theme */
import { colors } from '../../theme/app-theme';

/* Esquema de validacion de los datos del formulario de tareas */
const taskFormSchema = object().shape({
    title: string()
        .required('El titulo de la tarea no puede estar vacia'),
    body: string()
        .required('La descripción de la tarea no puede estar vacia'),
    finalDate: number()
        .min(1, 'Por favor seleccione una fecha de finalización')
        .required('La fecha de finalización de la tarea no puede estar vacia'),
});

/* Propiedades del componente */
interface Props {
    taskStatus: TasksStatus;
    navigation: DrawerNavigationProp<TasksNavigatorParams, 'CreateTaskScreen'>
}

export const TaskForm = ({ taskStatus, navigation }: Props) => {
    /* states para mostrar modales de la UI (Modal, DatePicker e ImageView) */
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const [ showDatePicker, setShowDatePicker ] = useState<boolean>(false);
    const [ showImageView, setShowImageView ] = useState<boolean>(false);

    /* state para habilitar y deshabilitar el boton de guardar */
    const [ isBtnDisabled, setIsBtnDisabled ] = useState<boolean>(false);

    const { height, width } = useWindowDimensions();

    const { form, onChangeField, resetForm, setFormValue } = useForm({ title: '', body: '', finalDate: 0 });
    const { image,handleTakeImageFromLibrary, handleTakePhoto, setImage } = useImage();
    const { setMsgError } = useStatus();
    const { selectedTask, createTask, removeSelectedTask, updateTask } = useTasks();

    /* Función para crear o actualizar una tarea */
    const handleSubmit = async () => {
        setIsBtnDisabled(true);

        try {
            await taskFormSchema.validate(form);

            /* Evaluar si es una tarea nueva o una tarea existente */
            if (!!selectedTask.id) {
                await updateTask(
                    { ...selectedTask, ...form }, 
                    taskStatus,
                    image.base64
                );
            }   
            else {
                await createTask(form, taskStatus, image.base64);
            }

            setIsBtnDisabled(false);
        } 
        catch (error: any) {
            const values = Object.values(error.errors) as string[];
            setMsgError(values[0]);
            setIsBtnDisabled(false);
        }
    }

    /* Funcion que rescata el valor de la fecha de finalizacion de la tarea */
    const handleSelectedDate = (date: Date | undefined) => {
        setShowDatePicker(false);
        if (date) onChangeField(date.getTime(), 'finalDate');
    }

    /** useEffect para setear el formulario con los datos de la tarea seleccionada
     * o con los datos por defecto 
    */
    useEffect(() => {
        setFormValue({ 
            title: selectedTask.title, 
            body: selectedTask.body,
            finalDate: selectedTask.finalDate
        });

        if (selectedTask.image) setImage({ uri: selectedTask.image });
    }, [ selectedTask ]);

    /** useEffect para resetar el formulario, remover la tarea selecionada y
     *  resetear la imagen cuando se sale de la pantalla 
    */
    useEffect(() => {
        const unSubscribeBlur = navigation.addListener('blur', () => {
            removeSelectedTask();
            resetForm();
            setImage({});
        });

        return unSubscribeBlur;
    }, [ navigation ]);

    return (
        <>
            <View 
                style={{ 
                    ...styles.form,
                    bottom: height * 0.14,
                    top: (height > width) ? -height * 0.04 : -height * 0.1,
                    minHeight: (height > width) ? height * 0.8 : height * 1.20,
                }}
            >
                { /* Campo de título */ }
                <View style={ styles.formTaskTitle }>
                    <TextInput 
                        autoCapitalize="none"
                        blurOnSubmit
                        disableFullscreenUI={ true }
                        onChangeText={ (text) => onChangeField(text, 'title') }
                        placeholder="Título de la tarea"
                        placeholderTextColor={ colors.textGray }
                        style={ styles.formTaskTitleInput }
                        textContentType="name"
                        value={ form.title }
                    />
                </View>

                { /* Campo de cuerpo */ }
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        autoCapitalize="none"
                        disableFullscreenUI
                        multiline
                        numberOfLines={ 14 }
                        onChangeText={ (text) => onChangeField(text, 'body') }
                        placeholder="Descripción de la tarea"
                        placeholderTextColor={ colors.textGray }
                        style={ styles.formTaskBodyInput }
                        value={ form.body }
                    />
                </View>

                { 
                    /* Evaluación de para mostrar la imagen de la tarea */
                    !!image.uri && (
                        <TouchableOpacity 
                            style={ styles.formImageSelected }
                            activeOpacity={ 0.8 }
                            onPress={ () => setShowImageView(true) }
                        >
                            <Image 
                                source={{ uri: image.uri }} 
                                style={ styles.formImage } 
                            /> 
                        </TouchableOpacity>
                    ) 
                }

                { /* Campo de la fecha de finalización */ }
                <View 
                    style={{ 
                        ...styles.formDateSelected, 
                        bottom: (form.finalDate !== 0) ? 90 : 110,
                    }}
                >
                    <Text style={ styles.formDateSelectedLabel }>Fecha de entrega:</Text>

                    {
                        /* Evalucación */
                        form.finalDate !== 0 && (
                            <Text style={ styles.formDateSelectedText }>
                                { dayjs(form.finalDate).format('DD/MM/YYYY') }
                            </Text>
                        )
                    }
                </View>

                { /* Boton para abrir la camara y tomar foto */ }
                <Fab 
                    icon="camera-outline"
                    iconSize={ 37 }
                    onPress={ handleTakePhoto }
                    style={{ ...styles.formTaskButtonContainer, left: 20 }}
                    buttonStyle={{ ...styles.formTaskButtonAction, borderRadius: 15 }}
                    iconStyle={{ marginLeft: 0 }}
                />

                { /* Boton para seleccionar imagen de la galeria */ }
                <Fab 
                    icon="image-outline"
                    iconSize={ 37 }
                    onPress={ handleTakeImageFromLibrary }
                    style={{ ...styles.formTaskButtonContainer, left: 80 }}
                    buttonStyle={{ ...styles.formTaskButtonAction, borderRadius: 15 }}
                    iconStyle={{ marginLeft: 0 }}
                />

                { /* Boton para abrir el calendario */ }
                <Fab 
                    icon="calendar-outline"
                    iconSize={ 37 }
                    onPress={ () => setShowDatePicker(true) }
                    style={{ ...styles.formTaskButtonContainer, left: 140 }}
                    buttonStyle={{ ...styles.formTaskButtonAction, borderRadius: 15 }}
                    iconStyle={{ marginLeft: 0 }}
                />

                { /* Boton para crear o actualizar una tarea */ }
                <Fab 
                    icon="save-outline"
                    iconSize={ 37 }
                    onPress={ handleSubmit }
                    isDisabled={ isBtnDisabled }
                    style={ styles.formTaskButtonContainer }
                    buttonStyle={{ ...styles.formTaskButtonAction, borderRadius: 15 }}
                />

                {
                    /* Evaluación para mostrar boton de eliminación de tarea */
                    selectedTask?.id !== '' && (
                        <Fab 
                            icon="trash-outline"
                            iconSize={ 37 }
                            onPress={ () => setShowModal(true) }
                            style={{ ...styles.formTaskButtonContainer, right: 80 }}
                            buttonStyle={{ ...styles.formTaskButtonAction, borderRadius: 15 }}
                        />
                    )
                }
            </View>

            { /* Modal para seleccionar una fecha de finalización */ }
            <DateTimePickerModal
                mode="date"
                isVisible={ showDatePicker }
                onConfirm={ handleSelectedDate }
                onCancel={ () => setShowDatePicker(false) }
                display="default"
                is24Hour
                locale="es_ES"
                date={ (form.finalDate !== 0) ? dayjs(form.finalDate).toDate() : dayjs().toDate() }
            />

            { /* ImageView para mostrar la imagen de la tarea */ }
            <ImageView 
                animationType="fade"
                imageIndex={ 0 }
                images={ [{ uri: image?.uri || '' }] }
                onRequestClose={ () => setShowImageView(false) }
                swipeToCloseEnabled={ false }
                visible={ showImageView }                
            />

            { /* Modal para confirmar eliminación de tarea */ }
            <ModalScreen isVisible={ showModal }>
                <TaskDeleteModal 
                    closeModal={ () => setShowModal(false) } 
                    taskStatus={ taskStatus }
                />
            </ModalScreen>
        </>
    );
}

/* Estilos del componente */
const styles = StyleSheet.create({
    form: {
        backgroundColor: colors.lightGray,
        borderRadius: 40,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        elevation: 10,
        width: '90%',
        zIndex: 3
    },

    formTaskTitle: {
        backgroundColor: colors.light,
        borderRadius: 40,
        height: 80,
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        elevation: 5
    },

    formTaskTitleInput: {
        color: colors.darkBlue,
        fontSize: 20,
        paddingHorizontal: 20
    },

    formTaskButtonContainer: {
        bottom: 20, 
        right: 20,
        zIndex: 3 
    },

    formImageSelected: {
        backgroundColor: colors.light,
        borderRadius: 10,
        bottom: 85,
        left: 20,  
        padding: 6,
        position: 'absolute',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.25,
        elevation: 5
    },

    formImage: {
        borderRadius: 10,
        height: 100,
        width: 150
    },

    formTaskBodyInput: {
        color: '#000',
        fontSize: 18,
        maxHeight: 320,
        textAlignVertical: 'top',
        width: '90%'
    },

    formDateSelected: {
        position: 'absolute',
        right: 20
    },

    formDateSelectedLabel: {
        color: colors.darkBlue,
        fontSize: 16,
    },

    formDateSelectedText: {
        color: '#000'
    },

    formTaskButtonAction: {
        width: 48,
        height: 48
    }
})