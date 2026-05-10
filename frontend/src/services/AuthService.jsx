const TOKEN_KEY = 'retro-championship';
const USER_KEY = 'retro-championship-trophy';

const AuthService = {

    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    setUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    getUser() {
        const userStr = localStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    async login(mail, password) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({mail, password}),
        });

        const data = await response.json()

    if(data.token) {
        this.setToken(data.token);
    }

    const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
    const userId = tokenPayload.id;

    const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
        headers : {
            'Authorization' : `Bearer ${data.token}`,
        }
    });

    const userData = await userResponse.json();

    this.setUser(userData);
    return userData;
    
    },

    async register(userData) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(userData),
        });

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    if(data.token) {
        this.setToken(data.token);
    }

    if(data.user) {
        this.setUser(data.user);
        return data.user
    } else {

        const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
        const userId = tokenPayload.id;

        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, {
            headers : {
                'Authorization' : `Bearer ${data.token}`,
            }
        });

    const user = await userResponse.json();

    this.setUser(user);
    return user;
    
    }
},

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    isAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type' : 'application/json',
            'Authorization' : token ? `Bearer ${token}` : '',
        };
    }

}

export default AuthService;