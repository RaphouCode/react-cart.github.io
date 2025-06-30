import { useState, useEffect, Suspense } from 'react';
import Navbar from './navbar.jsx';
import ProductBoard from './board.jsx';
import Cart from './cart.jsx';
import './app.css';

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/products.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched products:', data);
      setAllProducts(data);
    };

    fetchProducts().catch(err => {
      console.error('Error fetching products:', err);
    });
  }, []);

  const addToCart = (product, category) => {
    if (product.stock === 0) return;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.nom === product.nom);
      if (existing) {
        return prevCart.map(item =>
          item.nom === product.nom
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          { ...product, quantity: 1 }
        ];
      }
    });
    setAllProducts(prevProducts => ({
      ...prevProducts,
      [category]: prevProducts[category].map(p =>
        p.nom === product.nom ? { ...p, stock: p.stock - 1 } : p
      )
    }));
  };

  const removeFromCart = (productName) => {
    let foundCategory = null;
    for (const cat of Object.keys(allProducts)) {
      if (allProducts[cat].some(p => p.nom === productName)) {
        foundCategory = cat;
        break;
      }
    }
    setCart(prevCart => {
      const existing = prevCart.find(item => item.nom === productName);
      if (existing && existing.quantity > 1) {
        return prevCart.map(item =>
          item.nom === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.nom !== productName);
      }
    });
    if (foundCategory) {
      setAllProducts(prevProducts => ({
        ...prevProducts,
        [foundCategory]: prevProducts[foundCategory].map(p =>
          p.nom === productName ? { ...p, stock: p.stock + 1 } : p
        )
      }));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.prix * item.quantity), 0);
  };

  return (
    <div>
      <Navbar />
      <main className="grid [grid-template-columns:3fr_2fr] gap-2 max-w-[1200px] mx-auto my-8 px-4">
        <Suspense fallback={<div>Chargement des produits...</div>}>
          {allProducts ? (
            <ProductBoard allProducts={allProducts} addToCart={addToCart} />
          ) : (
            <div>Chargement des produits...</div>
          )}
        </Suspense>
        <Cart
          cart={cart}
          total={calculateTotal()}
          removeFromCart={removeFromCart}
        />
      </main>
    </div>
  );
}