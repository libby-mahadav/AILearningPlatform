import API from '../api/axiosInstance';

export const login = async (id: string) => {
    const response = await API.post('/users/login', { id });
    return response.data; // רק מחזירים את המידע, הקומפוננטה תעשה login()
};

export const register = async (id: string, name: string, phone: string) => {
    const response = await API.post('/users/register', { id, name, phone });
    return response.data;
};