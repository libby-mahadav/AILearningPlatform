import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from '../services/categoryService';
import { getSubsByCatId } from "../services/subCategoryService"; 
import CategoryCard from "../components/categoryCard";
import Chat from "../components/chat";
import '../css/Dashboard.css'

const Dashboard = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sub, setSub] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedSub, setSelectedSub] = useState<any>(null);

    const navigate = useNavigate();

        const getCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data.data.categories || []);
        } catch (error) {
            console.error("failed to get categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleCategorySelect = async (category: any) => {
        setLoading(true);
        setSelectedCategory(category);
        try {
            const subs = await getSubsByCatId(category.id);
            setSub(Array.isArray(subs) ? subs : []);
        } catch (error) {
            console.error("failed to get sub categories", error);
            setSub([]);
        } finally {
            setLoading(false);
        }
    };

    // פונקציה לבדיקה אם המשתמש הוא מנהל לפי הטוקן
    const isAdmin = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const content = JSON.parse(atob(token.split('.')[1]));
            console.log("Token content:", content); // בדיקה זמנית לראות מה יש בטוקן
            return content.role === 'admin';
        } catch (e) {
            return false;
        }
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="dashboard-container">
            
            <div className="dashboard-header" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    className="history-nav-btn" 
                    onClick={() => navigate('/history')}
                >
                    📜 להיסטוריית הלמידה שלי
                </button>

                {/* כפתור ניהול שמופיע רק למנהל */}
                {isAdmin() && (
                    <button 
                        className="admin-nav-btn" 
                        onClick={() => navigate('/adminHistory')}
                        style={{
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            padding: '10px 15px',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        🛠️ ניהול מערכת
                    </button>
                )}
            </div>
            
            {selectedSub ? (
                /* מצב 3: צ'אט */
                <Chat
                    subCategoryName={selectedSub.name}
                    subCategoryId={selectedSub.id} 
                    onBack={() => setSelectedSub(null)} 
                />
            ) : !selectedCategory ? (
                /* מצב 1: קטגוריות ראשיות */
                <div className="categories-grid">
                    {categories.map(cat => (
                        <CategoryCard key={cat.id} name={cat.name} onClick={() => handleCategorySelect(cat)} />
                    ))}
                </div>
            ) : (
                /* מצב 2: תת קטגוריות */
                <div className="sub-categories-view">
                    <button className="back-btn" onClick={() => setSelectedCategory(null)}>🔙 חזרה לנושאים</button>
                    <div className="categories-grid">
                        {sub.map(s => (
                            <CategoryCard 
                                key={s.id} 
                                name={s.name} 
                                onClick={() => setSelectedSub(s)} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;