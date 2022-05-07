import { createContext, useState } from "react";

export const UserContext = createContext( {
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ token: undefined, user: undefined/*{ name: 'name', email: 'email'}*/});
    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value = {value}> {children} </UserContext.Provider>
}