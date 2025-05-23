import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CreditCard, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  // Mock cart data - in a real app this would come from a cart context/state
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: '1',
      title: 'Boubou traditionnel',
      price: 5000,
      image: 'https://images.pexels.com/photos/2474313/pexels-photo-2474313.jpeg?auto=compress&cs=tinysrgb&w=600',
      quantity: 1
    },
    {
      id: '2',
      title: 'T-shirt Dakar',
      price: 3000,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600',
      quantity: 1
    }
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-green-600 hover:text-green-700 flex items-center">
            <ArrowLeft className="h-5 w-5 mr-1" />
            Continuer mes achats
          </Link>
          <h1 className="text-2xl font-bold flex items-center text-gray-800">
            <ShoppingCart className="h-6 w-6 mr-2" />
            Mon panier
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <div key={item.id} className="p-6 flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-6 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-green-600 font-bold">{item.price.toLocaleString('fr-FR')} FCFA</p>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        -
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Sous-total</span>
                <span className="text-lg font-semibold">{total.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Livraison</span>
                <span className="text-lg font-semibold">1000 FCFA</span>
              </div>
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  {(total + 1000).toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Procéder au paiement
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">
              Découvrez nos produits et commencez votre shopping !
            </p>
            <Link 
              to="/products/all"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Voir les produits
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;