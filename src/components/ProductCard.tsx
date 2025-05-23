import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };
  
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button 
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-500'
            } shadow-md transition-colors duration-300`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-16 opacity-70"></div>
          <div className="absolute bottom-2 left-2 flex items-center text-white">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{product.location}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-green-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-xl font-bold text-green-600">{formatPrice(product.price)}</p>
          
          <div className="mt-3 flex justify-between items-center">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              product.category === 'women' ? 'bg-pink-100 text-pink-800' : 
              product.category === 'men' ? 'bg-blue-100 text-blue-800' :
              product.category === 'children' ? 'bg-yellow-100 text-yellow-800' :
              product.category === 'home' ? 'bg-green-100 text-green-800' :
              product.category === 'electronics' ? 'bg-purple-100 text-purple-800' :
              'bg-red-100 text-red-800'
            }`}>
              {product.category === 'women' ? 'Femmes' : 
               product.category === 'men' ? 'Hommes' :
               product.category === 'children' ? 'Enfants' :
               product.category === 'home' ? 'Maison' :
               product.category === 'electronics' ? 'Électronique' :
               'Divertissement'}
            </span>
            
            <span className="text-sm text-gray-500">Il y a 2 jours</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;