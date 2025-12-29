import API from '../api/axiosInstance';
import App from '../App';

export const login = async (id: string) => {
    const response = await API.post('/auth/login', id);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', id);
    }
    return response.data;
};

export const register = async (id: string, name: string, phone: string) => {
    const response = await API.post('/auth/register', { id, name, phone });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', id);
    }
    return response.data;
}