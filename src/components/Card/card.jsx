export default function Card({ product, category, children, addToCart, showQuantity = false }) {

    const isOutOfStock = (product) => product.stock === 0;
    const grayed = isOutOfStock(product);

    return (
        <article
            key={product.nom}
            onClick={() => !grayed && addToCart && addToCart(product, category)}
            className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
                grayed ? 'opacity-50 pointer-events-none' : 'hover:border-blue-300 cursor-pointer'
            }`}
            tabIndex={0}
            aria-label={`Ajouter ${product.nom} au panier`}
        >
            <div className="w-full h-28 bg-gray-100 rounded-t-lg">
            </div>
            
            <div className="p-4">
                <h4 className="font-semibold mb-3 text-lg">{product.nom}</h4>
                
                <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-blue-600">{product.prix.toFixed(2)} €</span>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-xl">
                        {showQuantity ? `Quantité : ${product.quantity}` : `Stock : ${product.stock}`}
                    </span>
                </div>
                
                {children && (
                    <footer className="pt-3 border-t border-gray-100">
                        {children}
                    </footer>
                )}
            </div>
        </article>
    );
}