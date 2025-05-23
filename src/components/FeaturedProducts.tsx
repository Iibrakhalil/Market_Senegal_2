import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import ProductCard from './ProductCard';

// Mock data for featured products
const featuredProducts = [
  {
    id: '1',
    title: 'Boubou traditionnel sénégalais',
    price: 15000,
    location: 'Dakar',
    image: 'https://images.pexels.com/photos/2474313/pexels-photo-2474313.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'women'
  },
  {
    id: '2',
    title: 'Samsung Galaxy S21',
    price: 250000,
    location: 'Thiès',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'electronics'
  },
  {
    id: '3',
    title: 'Chaussures en cuir pour homme',
    price: 12000,
    location: 'Saint-Louis',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'men'
  },
  {
    id: '4',
    title: 'Ensemble pour enfant',
    price: 8000,
    location: 'Mbour',
    image: 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'children'
  },
  {
    id: '5',
    title: 'Lampe décorative',
    price: 6500,
    location: 'Dakar',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'home'
  },
  {
    id: '6',
    title: 'Jeu vidéo PS5 FIFA 25',
    price: 35000,
    location: 'Dakar',
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'entertainment'
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default FeaturedProducts;