export type CategoryType = 'all' | 'pizza' | 'burger' | 'sushi' | 'healthy' | 'asian' | 'mexican' | 'desserts' | 'drinks';

export interface AddonOption {
  id: string;
  name: string;
  price: number;
}

export interface DishOptions {
  sizes?: { name: string; priceDelta: number }[];
  spiceLevels?: string[];
  addons?: AddonOption[];
}

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
  rating: number;
  reviewsCount: number;
  prepTime: string; // e.g., "15-20 min"
  prepTimeMinutes: number;
  calories: number;
  isPopular?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  ingredients: string[];
  options?: DishOptions;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  bannerImage: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  distance: string;
  tags: string[];
}

export interface CustomizationChoice {
  selectedSize?: { name: string; priceDelta: number };
  spiceLevel?: string;
  selectedAddons: AddonOption[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // unique identifier for cart entry
  dish: Dish;
  quantity: number;
  choice: CustomizationChoice;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'placed' | 'preparing' | 'picked_up' | 'on_the_way' | 'delivered';

export interface DriverInfo {
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  vehicle: string;
  licensePlate: string;
  currentLat: number;
  currentLng: number;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export interface Order {
  id: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  promoCodeApplied?: string;
  tip: number;
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string; // e.g. "25-35 min"
  estimatedDeliveryTimestamp: number;
  driver: DriverInfo;
  timeline: OrderTimelineEvent[];
}

export interface AIRecommendationRequest {
  query: string;
  dietaryRestrictions?: string[];
  maxBudget?: number;
  calorieTarget?: number;
}

export interface AIRecommendation {
  recommendedDishIds: string[];
  reasoning: string;
  nutritionHighlights: string;
  suggestedPairings: string[];
}
