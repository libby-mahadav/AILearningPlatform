import API from '../api/axiosInstance';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const sendMessageToAI = async (subCategoryId: number, messages: ChatMessage[]) => {
    try {
        const response = await API.post('/prompts/ask', {
            subCategoryId,
            messages
        });
        return response.data.data.reply; 
    } catch (error) {
        logger.error("ChatService Error:", error);
        throw error;
    }
};

export const getUserChatHistory = async () => {
    try{
        const response = await API.get('/prompts/history');
        return response.data.data;
    }catch(error){
        logger.error("Error getting history:", error);
        return [];
    }
};

export const getAllHistoryAdmin = async () => {
    try {
        const response = await API.get('/prompts/admin/allHistory');
        return response.data.data;
    } catch (error) {
        logger.error("Admin History Error:", error);
        return [];
    }
};