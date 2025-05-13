import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/Almacenadora_app/v1',
    timeout: 5000,
    httpAgent: false

})

apiClient.interceptors.request.use(
    (config) =>{
        const userDetails = localStorage.getItem("user")

        if(userDetails){
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (e) => {
        return Promise.reject(e)
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        return {
            error: true,
            e
        }
        
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post('/auth/register', data)
    } catch (e) {
        return {
            error: true,
            e
        }
        
    }
}

export const getCategorys = async () => {
    try {
        return await apiClient.get('/categories/')
    } catch (e) {
        return {
            error: true,
            e
        }
        
    }


}

export const getUserDetails = async () => {
    try {
        return await apiClient.get('/user/profile')
    } catch (e) {
        return{
            error: true,
            e
        }
        
    }

    
}

export const getUsers = async () => {
    try {
        return await apiClient.get('/user/')
    } catch (e) {
        return{
            error: true,
            e
        }
        
    }
    
}

export const getUserById = async (uid) => {
    try {
        return await apiClient.get(`/user/${uid}`)
    } catch (e) {
        return{
            error: true, 
            e
        }
        
    }
    
}