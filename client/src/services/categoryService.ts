import API from "../api/axiosInstance";

export const getAllCategories = async()=>{
    const response = await API.get('/categories/getAllCategories');
    return response.data;
}