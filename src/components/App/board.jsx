import Card from '../Card/card.jsx';

export default function ProductBoard({ allProducts, addToCart}) {
  return (
    <section className="bg-gray-50 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-8">Nos Produits</h2>
      
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Boissons</h3>
        <div className="grid grid-cols-3 gap-6">
          {allProducts['boissons'].map(product => {
            return (
              <Card key={product.nom} product={product} category="boissons" addToCart={addToCart} />
            );
          })}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-6">En-cas</h3>
        <div className="grid grid-cols-3 gap-6">
          {allProducts['en-cas'].map(product => {
            return (
                <Card key={product.nom} product={product} category="en-cas" addToCart={addToCart} />
            );
          })}
        </div>
      </div>
    </section>
  );
}