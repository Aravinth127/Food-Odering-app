import { Dish, Restaurant } from '../types';
import heroBannerImg from '../assets/images/hero_food_banner_1786430502925.jpg';
import burgerImg from '../assets/images/gourmet_burger_1786430516993.jpg';
import pizzaImg from '../assets/images/artisanal_pizza_1786430531091.jpg';
import sushiImg from '../assets/images/fresh_sushi_set_1786430546212.jpg';

export const HERO_BANNER_IMAGE = heroBannerImg;

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Artisan Oven & Grill',
    cuisine: 'Italian & Wood-Fired Pizza',
    bannerImage: pizzaImg,
    rating: 4.9,
    reviewsCount: 1420,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minOrder: 15.00,
    address: '422 Grand Avenue, Downtown',
    distance: '1.2 miles',
    tags: ['Pizza', 'Italian', 'Pasta', 'Popular'],
  },
  {
    id: 'rest-2',
    name: 'The Smash Burger Co.',
    cuisine: 'Gourmet Burgers & American',
    bannerImage: burgerImg,
    rating: 4.8,
    reviewsCount: 980,
    deliveryTime: '15-25 min',
    deliveryFee: 0, // Free Delivery
    minOrder: 12.00,
    address: '88 West Street, Uptown',
    distance: '0.8 miles',
    tags: ['Burger', 'Fries', 'American', 'Free Delivery'],
  },
  {
    id: 'rest-3',
    name: 'Sakura Zen Sushi Bar',
    cuisine: 'Japanese & Fresh Omakase',
    bannerImage: sushiImg,
    rating: 4.9,
    reviewsCount: 2150,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minOrder: 20.00,
    address: '105 Sakura Way, Financial District',
    distance: '2.1 miles',
    tags: ['Sushi', 'Japanese', 'Healthy', 'Top Rated'],
  },
];

export const DISHES: Dish[] = [
  // Pizza Category
  {
    id: 'dish-1',
    restaurantId: 'rest-1',
    name: 'Truffle Margherita Wood-Fired Pizza',
    description: 'San Marzano tomato base, fresh fior di latte mozzarella, black truffle glaze, extra virgin olive oil, and fresh basil leaves.',
    price: 18.99,
    category: 'pizza',
    image: pizzaImg,
    rating: 4.9,
    reviewsCount: 430,
    prepTime: '18 min',
    prepTimeMinutes: 18,
    calories: 820,
    isPopular: true,
    isVegan: false,
    isGlutenFree: false,
    ingredients: ['San Marzano Tomato', 'Fior di Latte Mozzarella', 'Black Truffle Oil', 'Fresh Basil', 'Organic Flour Crust'],
    options: {
      sizes: [
        { name: 'Medium 12"', priceDelta: 0 },
        { name: 'Large 16"', priceDelta: 5.50 },
        { name: 'Family 18"', priceDelta: 9.00 }
      ],
      addons: [
        { id: 'add-1', name: 'Extra Mozzarella', price: 2.50 },
        { id: 'add-2', name: 'Prosciutto di Parma', price: 4.00 },
        { id: 'add-3', name: 'Hot Honey Drizzle', price: 1.50 },
        { id: 'add-4', name: 'Gluten-Free Crust', price: 3.50 }
      ]
    }
  },
  {
    id: 'dish-2',
    restaurantId: 'rest-1',
    name: 'Diavola Spicy Pepperoni Pizza',
    description: 'Crispy pepperoni cups, crushed Calabrian chili paste, mozzarella, shaved parmesan, and wildflower honey drizzle.',
    price: 19.50,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 310,
    prepTime: '20 min',
    prepTimeMinutes: 20,
    calories: 940,
    isPopular: true,
    isSpicy: true,
    ingredients: ['Cupping Pepperoni', 'Calabrian Chili', 'Mozzarella', 'Parmesan', 'Spicy Honey'],
    options: {
      sizes: [
        { name: 'Medium 12"', priceDelta: 0 },
        { name: 'Large 16"', priceDelta: 5.50 }
      ],
      spiceLevels: ['Mild', 'Medium Chili', 'Extra Hot Calabrian'],
      addons: [
        { id: 'add-5', name: 'Extra Pepperoni', price: 3.00 },
        { id: 'add-6', name: 'Garlic Butter Dip', price: 1.25 }
      ]
    }
  },

  // Burger Category
  {
    id: 'dish-3',
    restaurantId: 'rest-2',
    name: 'Double Smash Prime Cheeseburger',
    description: 'Two 100% Angus beef smashed patties, double American cheddar, caramelized balsamic onions, dill pickles, and signature house sauce on toasted brioche.',
    price: 14.99,
    category: 'burger',
    image: burgerImg,
    rating: 4.9,
    reviewsCount: 880,
    prepTime: '15 min',
    prepTimeMinutes: 15,
    calories: 780,
    isPopular: true,
    ingredients: ['Angus Beef', 'American Cheddar', 'Caramelized Onions', 'House Secret Sauce', 'Brioche Bun'],
    options: {
      sizes: [
        { name: 'Double Patty', priceDelta: 0 },
        { name: 'Triple Smash Patty', priceDelta: 3.50 }
      ],
      addons: [
        { id: 'add-7', name: 'Smoked Applewood Bacon', price: 2.25 },
        { id: 'add-8', name: 'Fried Cage-Free Egg', price: 1.75 },
        { id: 'add-9', name: 'Fresh Avocado Slices', price: 2.00 },
        { id: 'add-10', name: 'Side of Truffle Fries', price: 4.50 }
      ]
    }
  },
  {
    id: 'dish-4',
    restaurantId: 'rest-2',
    name: 'Crispy Nashville Hot Chicken Burger',
    description: 'Hand-battered crispy chicken breast tossed in cayenne hot oil, tangy apple slaw, spicy jalapeño ranch, and dill pickles.',
    price: 15.50,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 520,
    prepTime: '16 min',
    prepTimeMinutes: 16,
    calories: 850,
    isPopular: true,
    isSpicy: true,
    ingredients: ['Crispy Chicken Breast', 'Nashville Hot Spice Blend', 'Jalapeño Ranch', 'Coleslaw', 'Brioche Bun'],
    options: {
      spiceLevels: ['Country Mild', 'Nashville Medium', 'Hot Cayenne', 'Reaper 🔥'],
      addons: [
        { id: 'add-11', name: 'Extra Pickles', price: 0.75 },
        { id: 'add-12', name: 'Melted Pepper Jack', price: 1.50 }
      ]
    }
  },

  // Sushi Category
  {
    id: 'dish-5',
    restaurantId: 'rest-3',
    name: 'Dragon Deluxe Sushi Set (16 pcs)',
    description: 'Premium combination featuring Spicy Tuna Roll topped with unagi, sliced avocado, tobiko, sweet unagi sauce, and 6 pieces of Atlantic salmon nigiri.',
    price: 24.99,
    category: 'sushi',
    image: sushiImg,
    rating: 4.9,
    reviewsCount: 610,
    prepTime: '22 min',
    prepTimeMinutes: 22,
    calories: 610,
    isPopular: true,
    ingredients: ['Fresh Atlantic Salmon', 'Yellowfin Tuna', 'Unagi Eel', 'Avocado', 'Tobiko Caviar', 'Sushi Rice'],
    options: {
      addons: [
        { id: 'add-13', name: 'Extra Wasabi & Ginger', price: 1.00 },
        { id: 'add-14', name: 'Spicy Mayo Dip', price: 1.00 },
        { id: 'add-15', name: 'Edamame Appetizer', price: 4.99 }
      ]
    }
  },
  {
    id: 'dish-6',
    restaurantId: 'rest-3',
    name: 'Volcano Flame Roll (8 pcs)',
    description: 'Baked crab & scallops layered over California roll with spicy mayo sauce, unagi glaze, green onions, and crispy tempura crunchies.',
    price: 17.50,
    category: 'sushi',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 390,
    prepTime: '18 min',
    prepTimeMinutes: 18,
    calories: 520,
    isSpicy: true,
    ingredients: ['Crab Meat', 'Scallop', 'Avocado', 'Spicy Mayo', 'Tempura Crunch', 'Rice'],
    options: {
      addons: [
        { id: 'add-16', name: 'Side Miso Soup', price: 3.50 }
      ]
    }
  },

  // Healthy Category
  {
    id: 'dish-7',
    restaurantId: 'rest-3',
    name: 'Ahi Tuna & Mango Poke Bowl',
    description: 'Wild-caught yellowfin tuna, fresh mango, avocado, cucumber, edamame, seaweed salad, and ponzu sesame dressing on brown rice.',
    price: 16.99,
    category: 'healthy',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 480,
    prepTime: '12 min',
    prepTimeMinutes: 12,
    calories: 490,
    isPopular: true,
    isGlutenFree: true,
    ingredients: ['Yellowfin Tuna', 'Ripe Mango', 'Avocado', 'Edamame', 'Seaweed Salad', 'Brown Rice', 'Ponzu Drizzle'],
    options: {
      sizes: [
        { name: 'Regular Bowl', priceDelta: 0 },
        { name: 'Proteins Plus Bowl (+50% Tuna)', priceDelta: 4.00 }
      ],
      addons: [
        { id: 'add-17', name: 'Extra Avocado', price: 2.00 },
        { id: 'add-18', name: 'Crispy Garlic Flakes', price: 0.75 }
      ]
    }
  },
  {
    id: 'dish-8',
    restaurantId: 'rest-3',
    name: 'Mediterranean Vegan Grain Power Bowl',
    description: 'Organic quinoa, crispy falafel, roasted chickpeas, cucumber, cherry tomatoes, kalamata olives, house hummus, and lemon tahini dressing.',
    price: 14.50,
    category: 'healthy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 290,
    prepTime: '10 min',
    prepTimeMinutes: 10,
    calories: 430,
    isVegan: true,
    isGlutenFree: true,
    ingredients: ['Quinoa', 'Falafel', 'Chickpeas', 'Hummus', 'Kalamata Olives', 'Tahini Dressing'],
    options: {
      addons: [
        { id: 'add-19', name: 'Extra Falafel (3 pcs)', price: 3.00 },
        { id: 'add-20', name: 'Pita Bread Basket', price: 2.50 }
      ]
    }
  },

  // Mexican Category
  {
    id: 'dish-9',
    restaurantId: 'rest-2',
    name: 'Birria Quesa Tacos w/ Consomé Dip (3 pcs)',
    description: 'Slow-braised beef birria, melted Oaxaca cheese, cilantro, and onions stuffed in crispy dipped corn tortillas. Served with rich beef consomé for dipping.',
    price: 16.50,
    category: 'mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 740,
    prepTime: '15 min',
    prepTimeMinutes: 15,
    calories: 720,
    isPopular: true,
    ingredients: ['Braised Beef Birria', 'Oaxaca Cheese', 'Consomé Dip', 'Cilantro', 'Lime', 'Corn Tortillas'],
    options: {
      addons: [
        { id: 'add-21', name: 'Fresh Guacamole & Chips', price: 4.50 },
        { id: 'add-22', name: 'Extra Consomé Cup', price: 2.00 }
      ]
    }
  },

  // Desserts Category
  {
    id: 'dish-10',
    restaurantId: 'rest-1',
    name: 'Molten Belgian Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with Madagascar vanilla bean gelato and dark chocolate shavings.',
    price: 8.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 380,
    prepTime: '8 min',
    prepTimeMinutes: 8,
    calories: 540,
    ingredients: ['Belgian Dark Chocolate', 'Vanilla Gelato', 'Butter', 'Organic Cocoa'],
    options: {
      addons: [
        { id: 'add-23', name: 'Extra Scoop Vanilla Gelato', price: 2.50 },
        { id: 'add-24', name: 'Fresh Strawberries', price: 2.00 }
      ]
    }
  },

  // Drinks Category
  {
    id: 'dish-11',
    restaurantId: 'rest-2',
    name: 'Artisanal Fresh Mango Passionfruit Iced Tea',
    description: 'Brewed green tea infused with real Alphonso mango puree, passionfruit nectar, fresh mint leaves, and lime slices.',
    price: 4.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 190,
    prepTime: '3 min',
    prepTimeMinutes: 3,
    calories: 120,
    isVegan: true,
    isGlutenFree: true,
    ingredients: ['Green Tea', 'Mango Puree', 'Passionfruit Nectar', 'Mint', 'Lime'],
    options: {
      sizes: [
        { name: '16 oz Medium', priceDelta: 0 },
        { name: '24 oz Large', priceDelta: 1.25 }
      ]
    }
  }
];

export const PROMO_CODES: Record<string, { code: string; type: 'percentage' | 'fixed'; value: number; minSubtotal: number; description: string }> = {
  'WELCOME20': { code: 'WELCOME20', type: 'percentage', value: 20, minSubtotal: 15, description: '20% Off orders $15+' },
  'FREEDELIVERY': { code: 'FREEDELIVERY', type: 'fixed', value: 2.99, minSubtotal: 12, description: 'Free Delivery Discount ($2.99 off)' },
  'SAVEOFF5': { code: 'SAVEOFF5', type: 'fixed', value: 5.00, minSubtotal: 25, description: '$5 Off orders $25+' },
};
