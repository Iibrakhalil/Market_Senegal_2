import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Shield, Truck, Star } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import FeaturedProducts from '../components/FeaturedProducts';

const HomePage: React.FC = () => {
  const categories = [
    { id: 'women', name: 'Femmes', image: 'https://images.pexels.com/photos/4456148/pexels-photo-4456148.jpeg?auto=compress&cs=tinysrgb&w=600', color: 'bg-pink-500' },
    { id: 'men', name: 'Hommes', image: 'https://images.pexels.com/photos/4974791/pexels-photo-4974791.jpeg?auto=compress&cs=tinysrgb&w=600', color: 'bg-blue-500' },
    { id: 'children', name: 'Enfants', image: 'https://images.pexels.com/photos/3933031/pexels-photo-3933031.jpeg?auto=compress&cs=tinysrgb&w=600', color: 'bg-yellow-500' },
    { id: 'home', name: 'Maison', image: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600', color: 'bg-green-500' },
    { id: 'electronics', name: 'Électronique', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600', color: 'bg-purple-500' },
    { id: 'entertainment', name: 'Divertissement', image: 'https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=600', color: 'bg-red-500' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-green-50 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/3769149/pexels-photo-3769149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="lg:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Prêt à vider ton armoire ?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez le premier marché en ligne du Sénégal. Achetez et vendez des vêtements, de l'électronique et plus encore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/sell" 
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                Commencer à vendre
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/how-it-works" 
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium px-8 py-4 rounded-lg text-lg transition-all inline-flex items-center justify-center"
              >
                Comment ça marche
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir Sénégal Market ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-xl text-center transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sécurisé et fiable</h3>
              <p className="text-gray-600">Toutes les transactions sont sécurisées et les vendeurs sont vérifiés.</p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl text-center transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                <Truck className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison partout</h3>
              <p className="text-gray-600">Nous livrons dans toutes les régions du Sénégal rapidement et efficacement.</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl text-center transition-transform hover:transform hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <Star className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Produits de qualité</h3>
              <p className="text-gray-600">Des milliers d'articles vérifiés et notés par notre communauté.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Explorez nos catégories</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Découvrez une large sélection de produits dans différentes catégories pour tous vos besoins.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <CategoryCard 
                key={category.id} 
                id={category.id} 
                name={category.name} 
                image={category.image} 
                color={category.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Produits en vedette</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Découvrez notre sélection de produits populaires et tendance.
          </p>
          
          <FeaturedProducts />
          
          <div className="text-center mt-12">
            <Link 
              to="/products/all" 
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Voir tous les produits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à rejoindre notre communauté ?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Créez un compte gratuitement et commencez à acheter ou vendre dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-green-50 font-medium px-8 py-3 rounded-lg text-lg transition-all">
              S'inscrire maintenant
            </button>
            <Link 
              to="/sell" 
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-medium px-8 py-3 rounded-lg text-lg transition-all inline-flex items-center justify-center"
            >
              Commencer à vendre
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;