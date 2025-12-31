import React, { useState } from "react";
import { sendMessageToAI, type ChatMessage } from "../services/chatService";
import '../css/Chat.css';

interface ChatProps {
    subCategoryName: string;
    subCategoryId: number; 
    onBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ subCategoryName, subCategoryId, onBack }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userContent = input;
        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userContent }];
        
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            
            const reply = await sendMessageToAI(subCategoryId, newMessages);
            setMessages([...newMessages, { role: 'assistant', content: reply }]);
       
        } catch (error) {
            console.error("Failed to get AI response", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to teacher." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatContainer">
            <div className="chatHeader">
                <button onClick={onBack} className="backBtn">BACK</button>
                <h2>Learning {subCategoryName}</h2>
            </div>

            <div className="messagesWindow">
                {messages.length === 0 ? (
                    <p className="welcomeMsg">Hello! Ask me anything about {subCategoryName}.</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.role}`}>
                            {msg.content}
                        </div>
                    ))
                )}
                {isLoading && <div className="loading">Teacher is thinking...</div>}
            </div>

            <div className="chatInputArea">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type here..."
                />
                <button onClick={handleSendMessage} disabled={isLoading}>Send</button>
            </div>
        </div>
    );
};

export default Chat;