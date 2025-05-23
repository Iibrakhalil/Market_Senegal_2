import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, color }) => {
  return (
    <Link 
      to={`/products/${id}`}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70`}></div>
      <div className="relative p-6 flex items-end h-64">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <span className="inline-flex items-center bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-300 group-hover:translate-x-2">
            Explorer
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;