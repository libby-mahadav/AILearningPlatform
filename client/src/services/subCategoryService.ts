import API  from "../api/axiosInstance";


export const getSubsByCatId = async (categoryId: number)=>{
    const response = await API.get(`/subcategories/getSubsByCatId/${categoryId}`);
    return response.data.data.subs;
}
