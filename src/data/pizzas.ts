export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  category: string;
}

export const pizzas: Pizza[] = [
  {
    id: "1",
    name: "Cheese Lovers",
    description: "Combination of Alfredo sauce and two cheeses – Romano and Parmesan.",
    price: 20.00,
    image: "/images/cheese.png",
    ingredients: ["Alfredo sauce", "Romano cheese", "Parmesan cheese"],
    category: "Classic"
  },
  {
    id: "2",
    name: "Pepperoni",
    description: "Pizza with homemade spicy beef sausage.",
    price: 25.00,
    image: "/images/pepperoni.png",
    ingredients: ["Spicy beef sausage", "Tomato sauce", "Mozzarella"],
    category: "Special"
  },
  {
    id: "3",
    name: "Margherita Pizza",
    description: "Made with San Marzano tomatoes, mozzarella cheese, and fresh basil.",
    price: 35.00,
    image: "/images/margherita.png",
    ingredients: ["San Marzano tomatoes", "Mozzarella cheese", "Fresh basil"],
    category: "Classic"
  }
];
