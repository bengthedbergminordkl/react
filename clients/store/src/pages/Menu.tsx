import MenuItem from "@/components/MenuItem";
import type { ProductItem } from "@/types/productItem";

const items: ProductItem[] = [
  {
    id: "1",
    name: "Digital Gift Card",
    description: "Buy a digital gift card for $15, $25, $50 or $100",
    priceRange: [15.0, 25.0, 50.0, 100.0],
    image: "http://localhost:4200/digital.png",
    category: "giftcard",
  },
  {
    id: "2",
    name: "Physical Gift Card",
    description: "Buy a physical gift card for $15, $25, $50 or $100",
    priceRange: [15.0, 25.0, 50.0, 100.0],
    image: "http://localhost:4200/physical.png",
    category: "giftcard",
  },
];

function Menu() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            The Perfect Gift
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
            Not sure what to get? Perfect for any occasion - birthdays,
            holidays, or just because.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
