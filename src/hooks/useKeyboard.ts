import { useState } from 'react';

/* Hook para gestionar el teclado */
const useKeyboard = () => {
    const [ keyboardShow, setKeyboardShow ] = useState(false);

    return {
        keyboardShow,
        setKeyboardShow
    }
};

export default useKeyboard;