import Card from "../Card/card";

export default function Cart({ cart, total, removeFromCart }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full">
      <h2 className="text-2xl font-bold mb-6">Votre Panier</h2>
      
      {cart.length === 0 ? (
        <section className="text-center py-8">
          <p className="text-gray-500 text-lg">Votre panier est vide</p>
        </section>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {cart.map(item => (
              <Card key={item.nom} product={item} category="panier" showQuantity={true}>
                <button 
                  onClick={() => removeFromCart(item.nom)} 
                  className="bg-red-600 w-full start-full hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Retirer ${item.nom} du panier`} 
                  disabled={item.quantity === 0}
                >
                  Retirer
                </button>
              </Card>
            ))}
          </div>
          
          <section className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-700">Total à payer</span>
              <span className="text-2xl font-bold text-blue-600">{total.toFixed(2)} €</span>
            </div>
            <button className="w-full bg-blue-900 hover:bg-blue-950 text-white py-3 px-6 rounded-md font-semibold transition-colors">
              Commander
            </button>
          </section>
        </>
      )}
    </div>
  );
}