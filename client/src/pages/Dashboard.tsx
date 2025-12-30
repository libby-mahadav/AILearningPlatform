import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from '../services/categoryService';
import { getSubsByCatId  } from "../services/subCategoryService";  
import CategoryCard from "../components/categoryCard";
import Chat  from "../components/chat";
import '../css/Dashboard.css'

const Dashboard = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sub, setSub] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedSub, setSelectedSub] = useState<any>(null);

    const navigate = useNavigate();
      useEffect(() => {
        getCategories();

    },[]);

    const getCategories = async ()=>{
        try{
            const data = await getAllCategories();
            setCategories(data.data.categories || []);
        } catch(error){
            console.error("failed to get categories:", error);
        } finally{
            setLoading(false);
        }
    };

    const handleCategorySelect = async(category: any)=>{
        setLoading(true);
        setSelectedCategory(category);
        try{
            const subs = await getSubsByCatId(category.id);
            console.log("2. Dashboard received from service:", subs); //למחוק אחר כך
           setSub(Array.isArray(subs) ? subs : []);
        }catch(error){
            console.error("failed to get sub categories",error);
            setSub([]);
        }finally{
            setLoading(false);
        }
    };
    const goBack = ()=>{
        setSelectedCategory(null);
        setSub([]);
    };

    if (loading) return <div className="loader">Loading...</div>;

    return (
    <div className="dashboard-container">
        
        <div className="dashboard-header">
            <button 
                className="history-nav-btn" 
                onClick={() => navigate('/history')}
            >
                📜 להיסטוריית הלמידה שלי
            </button>
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
            <div className="sub-categories-view">
                <button onClick={() => setSelectedCategory(null)}>Back to Topics</button>
                <div className="categories-grid">
                    {sub.map(sub => (
                        <CategoryCard 
                            key={sub.id} 
                            name={sub.name} 
                            onClick={() => setSelectedSub(sub)} 
                        />
                    )
                    )}
                </div>
            </div>
        )}
    </div>
);
    // return(
    //     <div className="dashboardContainer">
    //         <header className="dashboardHeader">
    //             <h1>{selectedCategory ? selectedCategory.name: "What would you like to learn?"}</h1>
    //             {selectedCategory && (
    //                 <button className="backBtn" onClick={goBack}>BACK</button>
    //             )}
    //         </header>

    //         <main className="categoriesGrid">
    //             {!selectedCategory ? (
    //                 categories.map(cat => (
    //                         <CategoryCard
    //                         key={cat.id}
    //                         name={cat.name}
    //                         onClick={()=> handleCategorySelect(cat)}
    //                         />
    //                     ))
    //                 ):(sub.length >0 ? (
    //                     sub.map(sub => (
    //                         <CategoryCard 
    //                         key={sub.id}
    //                         name={sub.name}
    //                         onClick={()=>console.log("sub chosen:", sub.id)}
    //                         />
    //                     ))
    //                 ): <p>there aren't any sub categories availeble on this subject... send a request</p>
    //             )}
    //         </main>
    //     </div>
    // );
// } ;
};
export default Dashboard;