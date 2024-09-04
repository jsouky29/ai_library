import React, { useState, createContext, useEffect } from 'react';

export const LoginContext = createContext();

function LoginState({ children }) {
    const [isLogged, setisLogged] = useState(() => {
        // Retrieve the initial state from local storage if it exists
        const savedState = localStorage.getItem('isLogged');
        return savedState === 'true' ? true : false;
    });

    useEffect(() => {
        // Save the login state to local storage whenever it changes
        localStorage.setItem('isLogged', isLogged);
    }, [isLogged]);

    function changedLogin() {
        setisLogged(!isLogged);
    }

    return (
        <LoginContext.Provider value={{ changedLogin, isLogged }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginState;
