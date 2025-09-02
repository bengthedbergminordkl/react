import { Link, useLocation } from "react-router";
import logo from "@/assets/logo.png";
import { MdOutlineShoppingCart } from "react-icons/md";

function Header() {
  const location = useLocation();

  return (
    <header className="bg-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="logo" className="h-10 w-auto max-h-12" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-white ${
                location.pathname === "/" ? "text-white" : "text-gray-400"
              }`}
            >
              MENU
            </Link>
            <Link
              to="/cart"
              className={`text-sm font-medium transition-colors hover:text-white ${
                location.pathname === "/cart" ? "text-white" : "text-gray-400"
              }`}
            >
              CART
            </Link>
          </nav>

          <Link
            to="/cart"
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <MdOutlineShoppingCart className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
