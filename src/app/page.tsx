import Image from "next/image";
import Link from "next/link";
import { pizzas } from "@/data/pizzas";

export default function Home() {
  const featuredPizzas = pizzas.slice(0, 3);

  return (
    <main>

      <section className="flex items-center justify-between py-12 px-8">
        <div className="max-w-xl">
          <h1 className="text-6xl font-black text-gray-800 mb-4">
            Friday pizza!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Time to enjoy our delicious pizza.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors"
          >
            ORDER NOW
          </Link>
        </div>

        <figure className="relative w-[500px] h-[400px]">
          <Image
            src="/images/header.png"
            alt="Delicious Pizza"
            fill
            className="object-contain"
            priority
          />
        </figure>
      </section>


      <section className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Pizzas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {featuredPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-gray-50 rounded-2xl p-6 text-center"
            >
              <Image
                src={pizza.image}
                alt={pizza.name}
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{pizza.name}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {pizza.description.slice(0, 60)}...
              </p>
              <p className="text-red-500 font-bold text-xl">
                ${pizza.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/menu"
            className="inline-block bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View full menu
          </Link>
        </div>
      </section>
    </main>
  );
}
