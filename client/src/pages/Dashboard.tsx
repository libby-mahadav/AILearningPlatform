import { useEffect, useState } from "react";
import { getAllCategories } from '../services/categoryService';
import { getSubsByCatId  } from "../services/subCategoryService";  
import CategoryCard from "../components/categoryCard";
import '../css/Dashboard.css'

const Dashboard = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

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
           setSubCategories(Array.isArray(subs) ? subs : []);
        }catch(error){
            console.error("failed to get sub categories",error);
            setSubCategories([]);
        }finally{
            setLoading(false);
        }
    };
    const goBack = ()=>{
        setSelectedCategory(null);
        setSubCategories([]);
    };

    if (loading) return <div className="loader">Loading...</div>;

    return(
        <div className="dashboardContainer">
            <header className="dashboardHeader">
                <h1>{selectedCategory ? selectedCategory.name: "What would you like to learn?"}</h1>
                {selectedCategory && (
                    <button className="backBtn" onClick={goBack}>BACK</button>
                )}
            </header>

            <main className="categoriesGrid">
                {!selectedCategory ? (
                    categories.map(cat => (
                            <CategoryCard
                            key={cat.id}
                            name={cat.name}
                            onClick={()=> handleCategorySelect(cat)}
                            />
                        ))
                    ):(subCategories.length >0 ? (
                        subCategories.map(sub => (
                            <CategoryCard 
                            key={sub.id}
                            name={sub.name}
                            onClick={()=>console.log("sub chosen:", sub.id)}
                            />
                        ))
                    ): <p>there aren't any sub categories availeble on this subject... send a request</p>
                )}
            </main>
        </div>
    );
} ;
export default Dashboard;