import React, { useEffect, useState } from 'react';
import { getUserChatHistory } from '../services/chatService';
import '../css/History.css'; // שימוש בקובץ ה-CSS היחיד שנשאר

const HistoryPage: React.FC = () => {
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

    if (loading) return <div className="loader">טוען היסטוריה...</div>;

    return (
        <div className="historyContainer">
            <h1>📓 יומן הלמידה שלי</h1>
            <div className="historyList">
                {history.map((item) => (
                    <div key={item.id} className="historyCard">
                        <div className="historyHeader">
                            {/* ודאי שהשדות האלו קיימים ב-DB שלך */}
                            <span className="topicTag">{item.SubCategory?.name || 'כללי'}</span>
                            <span className="dateTag">{new Date(item.createdAt).toLocaleDateString('he-IL')}</span>
                        </div>
                        <div className="historyBody">
                            <p><strong>שאלה:</strong> {item.prompt}</p>
                            <p><strong>תשובה:</strong> {item.response}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryPage;