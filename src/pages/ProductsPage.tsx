import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Search, ChevronDown, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// Mock data for products
const allProducts = [
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
  },
  {
    id: '7',
    title: 'Robe de soirée',
    price: 22000,
    location: 'Dakar',
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'women'
  },
  {
    id: '8',
    title: 'Veste en jean homme',
    price: 9500,
    location: 'Thiès',
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'men'
  },
  {
    id: '9',
    title: 'iPad Pro 2024',
    price: 280000,
    location: 'Dakar',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'electronics'
  }
];

const ProductsPage: React.FC = () => {
  const { category } = useParams<{category: string}>();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('newest');
  
  // Filter products based on category and other filters
  const filteredProducts = allProducts.filter(product => {
    // Filter by category (if not 'all')
    if (category && category !== 'all' && product.category !== category) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by location
    if (selectedLocations.length > 0 && !selectedLocations.includes(product.location)) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price_asc') {
      return a.price - b.price;
    } else if (sortOption === 'price_desc') {
      return b.price - a.price;
    }
    // Default is 'newest'
    return 0; // In a real app, you'd sort by date
  });
  
  // Get all available locations for filtering
  const locations = Array.from(new Set(allProducts.map(product => product.location)));
  
  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 500000]);
    setSelectedLocations([]);
    setSortOption('newest');
  };
  
  const getCategoryName = (categoryId: string) => {
    switch(categoryId) {
      case 'women': return 'Femmes';
      case 'men': return 'Hommes';
      case 'children': return 'Enfants';
      case 'home': return 'Maison';
      case 'electronics': return 'Électronique';
      case 'entertainment': return 'Divertissement';
      case 'all': return 'Tous les produits';
      default: return categoryId;
    }
  };
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {category ? getCategoryName(category) : 'Tous les produits'}
        </h1>
        
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 w-full md:w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
            >
              <Filter className="h-5 w-5 mr-1" />
              Filtres
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
            </button>
            
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="newest">Plus récents</option>
                <option value="price_asc">Prix (croissant)</option>
                <option value="price_desc">Prix (décroissant)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filtres</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-green-600 hover:text-green-700"
              >
                Réinitialiser
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-2">Prix (FCFA)</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    min="0"
                    className="w-full px-3 py-1 border border-gray-300 rounded-md"
                    placeholder="Min"
                  />
                  <span>à</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    min={priceRange[0]}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md"
                    placeholder="Max"
                  />
                </div>
              </div>
              
              {/* Locations */}
              <div>
                <h3 className="font-medium mb-2">Localisation</h3>
                <div className="space-y-1">
                  {locations.map(location => (
                    <label key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location)}
                        onChange={() => toggleLocation(location)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                      />
                      <span className="ml-2 text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Active filters */}
            {(selectedLocations.length > 0 || priceRange[0] > 0 || priceRange[1] < 500000) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedLocations.map(location => (
                  <div key={location} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
                    {location}
                    <button 
                      onClick={() => toggleLocation(location)}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                
                {(priceRange[0] > 0 || priceRange[1] < 500000) && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
                    {priceRange[0].toLocaleString('fr-FR')} - {priceRange[1].toLocaleString('fr-FR')} FCFA
                    <button 
                      onClick={() => setPriceRange([0, 500000])}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Product grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-2">Aucun produit trouvé</h2>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos filtres ou d'effectuer une autre recherche.
            </p>
            <button 
              onClick={clearFilters}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;