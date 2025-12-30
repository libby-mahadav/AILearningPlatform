import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHistoryAdmin } from '../services/chatService';
import '../css/AdminHistory.css';

const AdminHistoryPage: React.FC = () => {
    const [allHistory, setAllHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getAllHistoryAdmin();
                setAllHistory(data);
            } catch (error) {
                console.error("Error fetching admin history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="loader">טוען נתוני מערכת...</div>;

    return (
        <div className="admin-history-container">
            <header className="admin-header">
                <h1>🛠️ ניהול מערכת: היסטוריית למידה גלובלית</h1>
            </header>
        <button onClick={() => navigate('/dashboard')} className="back-btn" style={{marginTop: '20px'}}>
                🔙 חזרה לדאשבורד
            </button>
            <div className="admin-stats">
                <span>סה"כ שאלות במערכת: <strong>{allHistory.length}</strong></span>
            </div>

            <div className="admin-history-list">
                {allHistory.length === 0 ? (
                    <p>אין היסטוריית שאלות להצגה.</p>
                ) : (
                    allHistory.map((item) => (
                        <div key={item.id} className="admin-card">
                            
                            <div className="admin-card-sidebar">
                                <div className="admin-user-badge">
                                    👤 {item.user?.name || 'משתמש לא ידוע'}
                                </div>
                                <div>📞 {item.user?.phone || '-'}</div>
                                <div>📅 {new Date(item.createdAt).toLocaleDateString('he-IL')}</div>
                            </div>

                           <div className="admin-card-content">
    <div style={{ marginBottom: '10px' }}>
        {/* גישה לקטגוריה דרך התת-קטגוריה */}
        {item.SubCategory?.category?.name && (
            <span className="admin-topic-tag" style={{ backgroundColor: '#2c3e50', color: 'white', marginLeft: '5px' }}>
                📚 מקצוע: {item.SubCategory.category.name}
            </span>
        )}
        
        <span className="admin-topic-tag">
            📖 נושא: {item.SubCategory?.name || 'ללא פירוט'}
        </span>
    </div>

    <div className="admin-section">
        <strong>שאלה:</strong>
        <p>{item.prompt}</p>
    </div>

    <div className="admin-section">
        <strong>תשובת המורה (AI):</strong>
        <p>{item.response}</p>
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