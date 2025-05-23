import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sénégal Market</h3>
            <p className="text-gray-300 mb-4">
              Votre marketplace locale pour acheter et vendre des vêtements, de l'électronique et plus encore.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-300 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/women" className="text-gray-300 hover:text-yellow-300 transition-colors">Femmes</Link>
              </li>
              <li>
                <Link to="/products/men" className="text-gray-300 hover:text-yellow-300 transition-colors">Hommes</Link>
              </li>
              <li>
                <Link to="/products/children" className="text-gray-300 hover:text-yellow-300 transition-colors">Enfants</Link>
              </li>
              <li>
                <Link to="/products/home" className="text-gray-300 hover:text-yellow-300 transition-colors">Maison</Link>
              </li>
              <li>
                <Link to="/products/electronics" className="text-gray-300 hover:text-yellow-300 transition-colors">Électronique</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Aide & Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-300 transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-yellow-300 transition-colors">Comment ça marche</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-yellow-300 transition-colors">Livraison & Retours</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-yellow-300 transition-colors">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-yellow-300 transition-colors">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-yellow-400" />
                <span className="text-gray-300">Dakar, Sénégal</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-yellow-400" />
                <span className="text-gray-300">+221 XX XXX XX XX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                <span className="text-gray-300">contact@senegalmarket.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2025 Sénégal Market. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-300 hover:text-yellow-300 text-sm transition-colors">Conditions</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-yellow-300 text-sm transition-colors">Confidentialité</Link>
            <Link to="/cookies" className="text-gray-300 hover:text-yellow-300 text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;