
import { useState } from 'react';
import { ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';

/* Hook para hacer el manejo de los formularios */
const useForm = <T extends Object>(initState: T) => {
    /* Estado del formulario */
    const [ state, setState ] = useState(initState);

    /* Función para cambiar un campo del formulario */
    const onChangeField = (value: ValueOf<T>, field: keyof T) => {
        setState({
            ...state,
            [ field ]: value
        });
    }

    /* Función para setear el formulario */
    const setFormValue = (form: T) => {
        setState(form);
    }    

    /* Función para resetear el formulario */
    const resetForm = () => setState(initState);

    return {
        form: state,
        onChangeField,
        setFormValue,
        resetForm
    }
}

export default useForm;