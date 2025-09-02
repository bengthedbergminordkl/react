import type { ProductItem } from "@/types/productItem";
import { FaPlus } from "react-icons/fa";

interface MenuItemProps {
  item: ProductItem;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const displayPrice = item.priceRange
    ? `from $${item.priceRange[0].toFixed(2)}`
    : `$${item.price!.toFixed(2)}`;
  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group min-w-[260px]">
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-contain bg-white group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
            <span className="text-lg font-bold text-gray-500">
              {displayPrice}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {item.description}
          </p>

          <button
            onClick={() => console.log("Order button clicked")}
            className="w-full bg-black hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group/button"
          >
            <FaPlus className="h-4 w-4 transition-transform duration-200 group-hover/button:scale-110" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
