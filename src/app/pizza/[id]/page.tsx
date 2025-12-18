import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pizzas } from "@/data/pizzas";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  return pizzas.map((pizza) => ({
    id: pizza.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function PizzaDetailsPage({ params }: PageProps) {
  const pizza = pizzas.find((p) => p.id === params.id);

  if (!pizza) {
    notFound();
  }

  return (
    <main className="py-8">
      <Link
        href="/menu"
        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-full font-medium transition-all duration-200 mb-6 group"
      >
        <span className="text-lg group-hover:-translate-x-1 transition-transform duration-200">←</span>
        Back to Menu
      </Link>

      <div className="grid md:grid-cols-2 gap-12">

        <div className="flex justify-center items-center">
          <Image
            src={pizza.image}
            alt={pizza.name}
            width={400}
            height={400}
            className="object-contain pizza-detail-image"
            priority
          />
        </div>


        <div>
          <div className="bg-orange-100 text-orange-800 inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {pizza.category}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{pizza.name}</h1>
          
          <p className="text-xl text-gray-600 mb-6">{pizza.description}</p>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Ingredients:</h3>
            <ul className="space-y-2">
              {pizza.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Price</p>
            <p className="text-4xl font-bold text-red-500">
              ${pizza.price.toFixed(2)}
            </p>
          </div>

          <AddToCartButton 
            pizzaImage={pizza.image}
            pizzaName={pizza.name}
          />
        </div>
      </div>


      <section className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Nutritional Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">320</p>
            <p className="text-gray-600">Calories</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">12g</p>
            <p className="text-gray-600">Protein</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">35g</p>
            <p className="text-gray-600">Carbs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">15g</p>
            <p className="text-gray-600">Fat</p>
          </div>
        </div>
      </section>
    </main>
  );
}