import { createContext } from "react";

export const AuthContext = createContext({
    currentUser: null,
    token: null,
    login: () => {},
    logout: () => {}
})