export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
        <div className="text-xl font-semibold">
          Ma Boutique
        </div>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <a href="" className="hover:text-blue-300 transition-colors">Boissons</a>
          </li>
          <li>
            <a href="" className="hover:text-blue-300 transition-colors">En-cas</a>
          </li>
          <li>
            <a href="" className="hover:text-blue-300 transition-colors">Promotions</a>
          </li>
          <li>
            <button className="bg-blue-900 hover:bg-blue-950 px-4 py-2 rounded-md transition-colors">Connexion</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}