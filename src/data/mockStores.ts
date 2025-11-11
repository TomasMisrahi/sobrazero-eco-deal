// Mock data centralizado para los comercios y reseñas

export interface Product {
  id: string;
  name: string;
  stock: number;
  weight?: number;
  originalPrice: number;
  discountedPrice: number;
  imageUrl?: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  discount: number;
  originalPrice: number;
  discountedPrice: number;
  pickupTime: string;
  available: number;
  description: string;
  products: Product[];
  imageUrl?: string;
  lat?: number;
  lng?: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const stores: Store[] = [
  {
    id: "1",
    name: "Panadería Don Juan",
    category: "panaderia",
    lat: -34.6025,
    lng: -58.3945,
    distance: "0.5 km",
    address: "Av. Corrientes 2850, Balvanera",
    rating: 4.5,
    reviewCount: 127,
    discount: 60,
    originalPrice: 2500,
    discountedPrice: 1000,
    pickupTime: "18:00 - 20:00",
    available: 5,
    description: "Bolsa sorpresa con productos de panadería frescos del día: pan, facturas, medialunas y más. Todos los productos están en perfecto estado.",
    products: [
      { id: "1-1", name: "Medialunas", stock: 24, weight: 0.6, originalPrice: 150, discountedPrice: 60 },
      { id: "1-2", name: "Pan francés", stock: 15, weight: 0.5, originalPrice: 200, discountedPrice: 80 },
      { id: "1-3", name: "Facturas surtidas", stock: 20, originalPrice: 120, discountedPrice: 48 },
      { id: "1-4", name: "Pan de campo", stock: 10, weight: 1.0, originalPrice: 350, discountedPrice: 140 },
    ],
    imageUrl: "",
  },
  {
    id: "2",
    name: "Supermercado Express",
    category: "supermercado",
    lat: -34.6058,
    lng: -58.3975,
    distance: "0.9 km",
    address: "Av. Pueyrredón 258, Balvanera",
    rating: 4.2,
    reviewCount: 89,
    discount: 50,
    originalPrice: 3000,
    discountedPrice: 1500,
    pickupTime: "19:00 - 21:00",
    available: 8,
    description: "Bolsa sorpresa con variedad de productos: verduras, frutas, lácteos y otros productos frescos. Perfecto para abastecer tu hogar.",
    products: [
      { id: "2-1", name: "Frutas de estación variadas", stock: 30, weight: 2.0, originalPrice: 800, discountedPrice: 400 },
      { id: "2-2", name: "Verduras frescas mixtas", stock: 25, weight: 1.5, originalPrice: 600, discountedPrice: 300 },
      { id: "2-3", name: "Lácteos (leche, yogurt)", stock: 40, originalPrice: 500, discountedPrice: 250 },
      { id: "2-4", name: "Pan del día", stock: 20, weight: 0.5, originalPrice: 250, discountedPrice: 125 },
      { id: "2-5", name: "Productos de almacén", stock: 35, originalPrice: 400, discountedPrice: 200 },
    ],
  },
  {
    id: "3",
    name: "Verdulería Los Andes",
    category: "verduleria",
    lat: -34.6070,
    lng: -58.3950,
    distance: "0.7 km",
    address: "Av. Córdoba 2645, Balvanera",
    rating: 4.7,
    reviewCount: 156,
    discount: 55,
    originalPrice: 2000,
    discountedPrice: 900,
    pickupTime: "17:00 - 19:00",
    available: 3,
    description: "Bolsa sorpresa con frutas y verduras frescas de estación. Productos de excelente calidad directos de la quinta.",
    products: [
      { id: "3-1", name: "Tomates", stock: 18, weight: 1.0, originalPrice: 400, discountedPrice: 180 },
      { id: "3-2", name: "Lechuga", stock: 25, originalPrice: 300, discountedPrice: 135 },
      { id: "3-3", name: "Zanahorias", stock: 20, weight: 0.5, originalPrice: 200, discountedPrice: 90 },
      { id: "3-4", name: "Manzanas", stock: 22, weight: 1.0, originalPrice: 450, discountedPrice: 203 },
      { id: "3-5", name: "Bananas", stock: 30, weight: 0.5, originalPrice: 250, discountedPrice: 113 },
      { id: "3-6", name: "Papas", stock: 15, weight: 1.0, originalPrice: 350, discountedPrice: 158 },
    ],
  },
  {
    id: "4",
    name: "Restaurante La Estancia",
    category: "restaurante",
    lat: -34.6032,
    lng: -58.4005,
    distance: "0.3 km",
    address: "Av. Rivadavia 2380, Balvanera",
    rating: 4.8,
    reviewCount: 203,
    discount: 70,
    originalPrice: 5000,
    discountedPrice: 1500,
    pickupTime: "20:00 - 21:30",
    available: 4,
    description: "Bolsa sorpresa con platos de restaurante preparados del día: minutas, guarniciones y postres. Comida casera de alta calidad.",
    products: [
      { id: "4-1", name: "Milanesa napolitana con guarnición", stock: 12, originalPrice: 1500, discountedPrice: 450 },
      { id: "4-2", name: "Ensalada mixta", stock: 15, originalPrice: 800, discountedPrice: 240 },
      { id: "4-3", name: "Tarta de verduras", stock: 10, originalPrice: 1200, discountedPrice: 360 },
      { id: "4-4", name: "Flan casero con dulce de leche", stock: 18, originalPrice: 600, discountedPrice: 180 },
    ],
  },
  {
    id: "5",
    name: "Panadería Artesanal",
    category: "panaderia",
    lat: -34.6048,
    lng: -58.3918,
    distance: "1.2 km",
    address: "Av. Callao 348, Balvanera",
    rating: 4.6,
    reviewCount: 94,
    discount: 65,
    originalPrice: 2800,
    discountedPrice: 980,
    pickupTime: "18:30 - 20:00",
    available: 6,
    description: "Bolsa sorpresa con pan artesanal, masas dulces y productos de pastelería. Todo elaborado con masa madre y productos naturales.",
    products: [
      { id: "5-1", name: "Pan de masa madre integral", stock: 16, weight: 1.0, originalPrice: 500, discountedPrice: 175 },
      { id: "5-2", name: "Croissants de manteca", stock: 24, originalPrice: 400, discountedPrice: 140 },
      { id: "5-3", name: "Budín de limón", stock: 12, weight: 0.5, originalPrice: 600, discountedPrice: 210 },
      { id: "5-4", name: "Cookies artesanales", stock: 30, originalPrice: 350, discountedPrice: 123 },
    ],
  },
];

export const allReviews: Record<string, Review[]> = {
  "1": [
    {
      id: "1",
      userName: "María González",
      rating: 5,
      comment: "Excelente calidad y variedad. Las medialunas estaban perfectas!",
      date: "Hace 2 días",
    },
    {
      id: "2",
      userName: "Carlos Pérez",
      rating: 4,
      comment: "Muy buena relación precio-calidad. Repetiré seguro.",
      date: "Hace 5 días",
    },
  ],
  "2": [
    {
      id: "1",
      userName: "Laura Martínez",
      rating: 4,
      comment: "Buena variedad de productos frescos. El precio es excelente.",
      date: "Hace 1 día",
    },
    {
      id: "2",
      userName: "Diego Rodríguez",
      rating: 5,
      comment: "Siempre encuentro productos de calidad. Muy recomendable.",
      date: "Hace 3 días",
    },
  ],
  "3": [
    {
      id: "1",
      userName: "Ana López",
      rating: 5,
      comment: "Las frutas y verduras están súper frescas. Volveré!",
      date: "Hace 1 día",
    },
    {
      id: "2",
      userName: "Roberto Sánchez",
      rating: 5,
      comment: "Productos de primera calidad a excelente precio.",
      date: "Hace 4 días",
    },
  ],
  "4": [
    {
      id: "1",
      userName: "Silvia Fernández",
      rating: 5,
      comment: "La comida es deliciosa! Como si fuera casera.",
      date: "Hace 2 días",
    },
    {
      id: "2",
      userName: "Pablo Torres",
      rating: 4,
      comment: "Muy buenas porciones y sabor excelente.",
      date: "Hace 1 semana",
    },
  ],
  "5": [
    {
      id: "1",
      userName: "Gabriela Ruiz",
      rating: 5,
      comment: "El mejor pan artesanal del barrio. Vale la pena!",
      date: "Hace 1 día",
    },
    {
      id: "2",
      userName: "Martín Castro",
      rating: 5,
      comment: "La masa madre es espectacular. Todo súper fresco.",
      date: "Hace 5 días",
    },
  ],
};
