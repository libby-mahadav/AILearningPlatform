import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from '../services/categoryService';
import { getSubsByCatId } from "../services/subCategoryService";
import CategoryCard from "../components/categoryCard";
import Chat from "../components/chat";
import '../css/Dashboard.css'
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sub, setSub] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedSub, setSelectedSub] = useState<any>(null);

    const navigate = useNavigate();


    const { role } = useAuth();
    const isAdmin = role === 'admin';

    useEffect(() => {
        getCategories();
    }, []);

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

    const handleCategorySelect = async (category: any) => {
        setLoading(true);
        setSelectedCategory(category);
        try {
            const subs = await getSubsByCatId(category.id);
            setSub(subs ? subs : []);
        } catch (error) {
            console.error("failed to get sub categories", error);
            setSub([]);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div className="loader">Loading...</div>;

    return (
        <div className="dashboardContainer">

            <div className="dashboardHeader">
                <button className="historyNavBtn" onClick={() => navigate('/history')}>
                    MY HISTORY
                </button>

                {isAdmin && (
                    <button
                        className="adminNavBtn"
                        onClick={() => navigate('/adminHistory')}
                    >
                        USERS HISTORY
                    </button>
                )}
            </div>

            {selectedSub ? (
                <Chat
                    subCategoryName={selectedSub.name}
                    subCategoryId={selectedSub.id}
                    onBack={() => setSelectedSub(null)}
                />
            ) : !selectedCategory ? (
                <div className="categoriesGrid">
                    {categories.map(cat => (
                        <CategoryCard key={cat.id} name={cat.name} onClick={() => handleCategorySelect(cat)} />
                    ))}
                </div>
            ) : (
                <div>
                    <button className="backBtn" onClick={() => setSelectedCategory(null)}>
                        BACK</button>
                    <div className="categoriesGrid">
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