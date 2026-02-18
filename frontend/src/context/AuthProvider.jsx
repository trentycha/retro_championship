import { useState } from "react"
import AuthService from '../services/AuthService.jsx'
import AuthContext from './AuthContext.js'

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const userStored = AuthService.getUser();
        const isAuth = AuthService.isAuthenticated();
        return (userStored && isAuth) ? userStored : null;
    });

    const login = async (mail, password) => {
        const userData = await AuthService.login(mail, password);
        setUser(userData);
        return userData;
    };

    const register = async (userData) => {
        const user = await AuthService.register(userData);
        setUser(user);
        return user;
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
    }

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated : !!user,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;