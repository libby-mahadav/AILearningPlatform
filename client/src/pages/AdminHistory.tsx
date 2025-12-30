import React, { useEffect, useState } from 'react';
import { getAllHistoryAdmin } from '../services/chatService';
import '../css/AdminHistory.css';

interface AdminHistoryItem {
    id: number;
    question: string;
    answer: string;
    createdAt: string;
    User?: {
        name: string;
        phone: string;
    };
    SubCategory?: {
        name: string;
    };
}

const AdminHistoryPage: React.FC = () => {
    const [allHistory, setAllHistory] = useState<AdminHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllHistory = async () => {
            const data = await getAllHistoryAdmin();
            setAllHistory(data);
            setLoading(false);
        };
        fetchAllHistory();
    }, []);

    if (loading) return <div className="loader">טוען נתוני מערכת...</div>;

    return (
        <div className="admin-history-container">
            <header className="admin-header">
                <h1>ניהול מערכת: היסטוריית למידה גלובלית</h1>
                <p>צפייה בכל השאלות והתשובות של כלל המשתמשים</p>
            </header>

            <div className="admin-stats">
                <span>סה"כ שאלות במערכת: <strong>{allHistory.length}</strong></span>
            </div>

            <div className="admin-history-list">
                {allHistory.length === 0 ? (
                    <p>אין נתונים להצגה.</p>
                ) : (
                    allHistory.map((item) => (
                        <div key={item.id} className="admin-card">
                            <div className="admin-card-sidebar">
                                <span className="admin-user-badge">👤 {item.User?.name || 'משתמש לא ידוע'}</span>
                                <span className="admin-phone">{item.User?.phone}</span>
                                <span className="admin-date">{new Date(item.createdAt).toLocaleDateString('he-IL')}</span>
                            </div>
                            
                            <div className="admin-card-content">
                                <div className="admin-card-header">
                                    <span className="admin-topic-tag">{item.SubCategory?.name || 'כללי'}</span>
                                </div>
                                <div className="admin-body">
                                    <div className="admin-section">
                                        <strong>שאלה:</strong>
                                        <p>{item.question}</p>
                                    </div>
                                    <div className="admin-section">
                                        <strong>תשובת AI:</strong>
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminHistoryPage;