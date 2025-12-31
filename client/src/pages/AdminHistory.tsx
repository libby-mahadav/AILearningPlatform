import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHistoryAdmin } from '../services/chatService';
import '../css/AdminHistory.css';

const AdminHistory: React.FC = () => {
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

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="admin-history-container">
            <header className="admin-header">
                <h1>ALL USERS HISTORY </h1>
            </header>
        <button onClick={() => navigate('/dashboard')} className="back-btn">
            BACK
            </button>
            <div className="admin-stats">
                <span> Number of questions<strong>{allHistory.length}</strong></span>
            </div>

            <div className="admin-history-list">
                {allHistory.length === 0 ? (
                    <p>There aren't any chats yet</p>
                ) : (
                    allHistory.map((item) => (
                        <div key={item.id} className="admin-card">
                            
                            <div className="admin-card-sidebar">
                                <div className="admin-user-badge">
                                    {item.user?.name }
                                </div>
                                <div> {item.user?.phone}</div>
                                <div> {new Date(item.createdAt).toLocaleDateString('he-IL')}</div>
                            </div>

                           <div className="admin-card-content">
    <div style={{ marginBottom: '10px' }}>
        {item.SubCategory?.category?.name && (
            <span className="admin-topic-tag"> 
                {item.SubCategory.category.name}
            </span>
        )}
        
        <span className="admin-topic-tag">
            {item.SubCategory?.name }
        </span>
    </div>

    <div className="admin-section">
        <strong>USER</strong>
        <p>{item.prompt}</p>
    </div>

    <div className="admin-section">
        <strong>AI:</strong>
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

export default AdminHistory;