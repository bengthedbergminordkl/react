export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  priceRange?: number[];
  image: string;
  category: 'giftcard' | 'discount' | 'specialty';
}