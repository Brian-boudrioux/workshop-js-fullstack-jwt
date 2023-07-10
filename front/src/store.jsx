import React, { createContext, useState, useContext, useEffect } from "react";
import userService from "./services/users";

const store = createContext();
const useStore = () => useContext(store);
const initialState = {
    user: null,
    isLogged: false
}

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(initialState);

    // when reloading the application we will call the api for checking if the user was already logged
    useEffect(() => {
        setConnection();
    }, [])

    const setConnection = async () => {
        try {
            const result = await userService.getCurrentUser();
            setAuth({user: result.data, isLogged: true});
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <store.Provider value={{auth, setAuth}} >
            {children}
        </store.Provider>
    )
}


export {AuthProvider};
export default useStore;
