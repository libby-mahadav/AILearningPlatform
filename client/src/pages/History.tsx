import React, { useEffect, useState } from 'react';
import { getUserChatHistory } from '../services/chatService';
import '../css/History.css'; 

const History: React.FC = () => {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getUserChatHistory();
            setHistory(data);
            setLoading(false);
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="loader">Loading..</div>;

    return (
        
        <div className="historyContainer">
            
            <h1>MY CHAT HISTORY</h1>
            <div className="historyList">
                {history.map((item) => (
                    <div key={item.id} className="historyCard">
                        <div className="historyHeader">
                            <span className="topicTag">{item.SubCategory?.name || 'topic'}</span>
                            <span className="dateTag">{new Date(item.createdAt).getDate()}</span>
                        </div>
                        <div className="historyBody">
                            <p><strong>YOU:</strong> {item.prompt}</p>
                            <p><strong>AI:</strong> {item.response}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;