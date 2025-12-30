import  { useEffect, useState } from "react";
import { getAllCategories } from '../services/categoryService';
import './css/Dashboard.css';

const Dashboard = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                console.log("Data from service", response);

                if (response && response.data && Array.isArray(response.data.categories))
                    setCategories(response.data.categories);

                else {
                    setCategories([]);
                }
            }
            catch (error) {
                console.log("error accured when got the categories", error);
                setCategories([]);
            }
            finally { setLoading(false); }
        };

        fetchCategories();
    }, []);
    if (loading) return <div> loading categories...</div>;

    return (
        <div className="dashboardContainer" >
            <h1 className="dashboardTitle">what would you want to learn today?</h1>
            <div className="categoriesGrid">
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="categoryCard"
                            onClick={() => console.log("category choosen:", category.id)}
                        >
                            <h3>{category.name}</h3>
                        </div>
                    ))
                ) : (
                    <p>no categories have found</p>
                )}

            </div>
        </div>
    );
};
export default Dashboard;