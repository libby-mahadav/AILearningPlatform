import React from 'react';
import '../css/CategoryCard.css';

interface CategoryCardProps {
    name: string;
    onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onClick }) => {
    return (
        <div className="categoryCard" onClick={onClick}>
            <h3>{name}</h3>
        </div>
    );
};

export default CategoryCard;