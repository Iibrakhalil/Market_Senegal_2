import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-9xl font-bold text-green-600">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Retour à l'accueil
          </Link>
          <button 
            onClick={() => history.back()}
            className="border border-green-600 text-green-600 hover:bg-green-50 font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;