import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHistoryAdmin } from '../services/chatService';
import '../css/AdminHistory.css';

const AdminHistoryPage: React.FC = () => {
    const [allHistory, setAllHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false); // מצב חדש לבדיקת הרשאה
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/');
                return;
            }

            try {
                // פענוח הטוקן ובדיקת תפקיד
                const payload = JSON.parse(atob(token.split('.')[1]));
                
                if (payload.role !== 'admin') {
                    // אם הוא לא אדמין, אנחנו לא מחכים - ישר זורקים אותו
                    navigate('/dashboard'); 
                    return;
                }

                // אם הגענו לכאן, הוא אדמין
                setIsAuthorized(true);
                const data = await getAllHistoryAdmin();
                setAllHistory(data);
            } catch (error) {
                console.error("Auth error:", error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetch();
    }, [navigate]);

    // 1. בזמן הטעינה או אם הוא לא מורשה - לא מראים כלום מהתבנית
    if (loading || !isAuthorized) {
        return <div className="loader">בודק הרשאות גישה...</div>;
    }

    // 2. רק אם הוא אדמין מורשה, הקוד שמתחת ירוץ והתבנית תוצג
    return (
        <div className="admin-history-container">
            <header className="admin-header">
                <h1>ניהול מערכת: היסטוריית למידה גלובלית</h1>
            </header>

            <div className="admin-history-list">
                {allHistory.length === 0 ? (
                    <p>אין נתונים להצגה.</p>
                ) : (
                    allHistory.map((item) => (
                        <div key={item.id} className="admin-card">
                             {/* התוכן של הכרטיס כפי שבנינו קודם */}
                             <p><strong>משתמש:</strong> {item.user?.name}</p>
                             <p><strong>שאלה:</strong> {item.prompt}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminHistoryPage;