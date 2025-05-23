import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Share2, Heart, MessageCircle, Flag, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data - in a real app this would come from an API
const products = {
  '1': {
    id: '1',
    title: 'Boubou traditionnel sénégalais',
    price: 15000,
    location: 'Dakar',
    images: [
      'https://images.pexels.com/photos/2474313/pexels-photo-2474313.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3371544/pexels-photo-3371544.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    description: 'Magnifique boubou traditionnel sénégalais pour femme. Taille M. Couleur bleue avec broderies dorées. Porté une seule fois pour une cérémonie. Parfait état, comme neuf.',
    category: 'women',
    condition: 'very_good',
    seller: {
      id: 'user123',
      name: 'Fatou Diop',
      rating: 4.8,
      memberSince: 'Janvier 2024',
      responseRate: '98%',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  }
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real app, you'd fetch the product based on the ID
  const product = id ? products[id as keyof typeof products] : null;
  
  if (!product) {
    return (
      <div className="pt-20 pb-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h1>
        <Link to="/" className="text-green-600 hover:text-green-700">
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };
  
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };
  
  const getConditionText = (condition: string) => {
    switch(condition) {
      case 'new': return 'Neuf avec étiquettes';
      case 'like_new': return 'Neuf sans étiquettes';
      case 'very_good': return 'Très bon état';
      case 'good': return 'Bon état';
      case 'fair': return 'État correct';
      default: return condition;
    }
  };
  
  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/" className="text-green-600 hover:text-green-700 flex items-center">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Retour aux résultats
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="lg:flex">
            {/* Product Images */}
            <div className="lg:w-2/3 relative">
              <div className="relative aspect-video lg:aspect-square bg-gray-100">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={product.title} 
                  className="w-full h-full object-contain"
                />
                
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail images */}
              {product.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {product.images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                        index === activeImageIndex ? 'border-green-500' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.title} thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/3 p-6 lg:border-l border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
              
              <div className="flex items-center mb-4">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-gray-500">{product.location}</span>
              </div>
              
              <p className="text-3xl font-bold text-green-600 mb-4">{formatPrice(product.price)}</p>
              
              <div className="flex space-x-2 mb-6">
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
                
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  {getConditionText(product.condition)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Contacter le vendeur
                </button>
                
                <button 
                  onClick={toggleFavorite}
                  className={`w-full font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                    isFavorite 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Sauvegardé' : 'Ajouter aux favoris'}
                </button>
                
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-200 transition-colors flex items-center justify-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  Partager
                </button>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-lg font-semibold mb-3">À propos du vendeur</h2>
                <div className="flex items-center">
                  <img 
                    src={product.seller.avatar} 
                    alt={product.seller.name} 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{product.seller.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        ★ {product.seller.rating}
                      </span>
                      <span className="mx-2">•</span>
                      <span>Membre depuis {product.seller.memberSince}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-red-600 hover:text-red-700 inline-flex items-center">
            <Flag className="h-4 w-4 mr-1" />
            Signaler cette annonce
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;