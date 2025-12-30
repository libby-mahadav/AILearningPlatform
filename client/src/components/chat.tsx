import React, { useState } from "react";
import '../css/Chat.css';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

interface ChatProps {
    subCategoryName: string;
    onBack: () => void;
}
const Chat: React.FC<ChatProps> = ({ subCategoryName, onBack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (!input.trim()) return;
        const newMessages: Message[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
    };
    return (
        <div className="chatContainer">
            <div className="chatHeader">
                <button onClick={onBack} className="backBtn">BACK</button>
                <h2>learning {subCategoryName} with the bot</h2>
            </div>

            <div className="messagesWindow">
                {messages.length === 0 ? (
                    <p className="welcomeMsg">Hello! today we'll learn {subCategoryName}. Ask anything on your mind</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.role}`}>
                            {msg.content}
                        </div>
                    ))
                )}
    </div>
    <div className="chatInputArea">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your question here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;