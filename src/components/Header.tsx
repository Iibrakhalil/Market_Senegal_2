import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, ShoppingCart, LogOut, User as LucideUser } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';



const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
          setIsSignUp(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setIsAuthModalOpen(false);
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-green-700 shadow-md' : 'bg-green-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">🇸🇳 Sénégal Market</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products/women" className="text-white hover:text-yellow-300 transition-colors">Femmes</Link>
            <Link to="/products/men" className="text-white hover:text-yellow-300 transition-colors">Hommes</Link>
            <Link to="/products/children" className="text-white hover:text-yellow-300 transition-colors">Enfants</Link>
            <Link to="/products/home" className="text-white hover:text-yellow-300 transition-colors">Maison</Link>
            <Link to="/products/electronics" className="text-white hover:text-yellow-300 transition-colors">Électronique</Link>
            <Link to="/products/entertainment" className="text-white hover:text-yellow-300 transition-colors">Divertissement</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="text-white hover:text-yellow-300 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setIsSignUp(true);
                    setIsAuthModalOpen(true);
                  }}
                  className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-md transition-colors"
                >
                  S'inscrire
                </button>
                <button 
                  onClick={() => {
                    setIsSignUp(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors"
                >
                  Se connecter
                </button>
              </>
            )}
            
            <Link 
              to="/sell" 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Vendre
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white hover:text-yellow-300"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/products/women"
              className="block px-3 py-2 text-white hover:bg-green-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Femmes
            </Link>
            <Link
              to="/products/men"
              className="block px-3 py-2 text-white hover:bg-green-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Hommes
            </Link>
            <Link
              to="/products/children"
              className="block px-3 py-2 text-white hover:bg-green-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Enfants
            </Link>
            <Link
              to="/products/home"
              className="block px-3 py-2 text-white hover:bg-green-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Maison
            </Link>
            <Link
              to="/products/electronics"
              className="block px-3 py-2 text-white hover:bg-green-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Électronique
            </Link>
            <Link
              to="/products/entertainment"
              className="block px-3 py-2 text-white hover:bg-green-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Divertissement
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-white hover:bg-green-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Panier
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <>
                  <div className="text-white px-3 py-2">
                    <User className="h-5 w-5 inline mr-2" />
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setIsSignUp(true);
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    S'inscrire
                  </button>
                  <button 
                    onClick={() => {
                      setIsSignUp(false);
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors"
                  >
                    Se connecter
                  </button>
                </>
              )}
              <Link 
                to="/sell" 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                Vendre
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {isSignUp ? "S'inscrire" : "Se connecter"}
              </h2>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Chargement...' : isSignUp ? "S'inscrire" : "Se connecter"}
              </button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-green-600 hover:text-green-700"
                >
                  {isSignUp ? "Déjà inscrit ? Se connecter" : "Pas encore inscrit ? S'inscrire"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;