import API from '../api/axiosInstance'

export const login = async (id: string) => {
    const response = await API.post('/users/login', { id });
    return response.data;
};

export const register = async (id: string, name: string, phone: string) => {
    const response = await API.post('/users/register', { id, name, phone });
    return response.data;
};

