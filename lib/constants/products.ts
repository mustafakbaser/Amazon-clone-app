export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Apple iPhone 13",
    price: 32999,
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&auto=format&fit=crop&q=60",
    category: "Elektronik"
  },
  {
    id: 2,
    title: "Samsung 4K Smart TV",
    price: 15999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60",
    category: "Elektronik"
  },
  {
    id: 3,
    title: "Sony WH-1000XM4",
    price: 4999,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60",
    category: "Elektronik"
  },
  {
    id: 4,
    title: "Apple MacBook Pro",
    price: 49999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60",
    category: "Bilgisayar"
  }
];