import Image from "next/image";
import Link from "next/link";
import { pizzas } from "@/data/pizzas";

// SSG: Esta página é gerada estaticamente em build time
// Justificativa: Conteúdo estático (hero section) que não muda frequentemente
// Melhor performance (HTML pré-renderizado), SEO otimizado, tempo de carregamento mínimo

export default function Home() {
  const featuredPizzas = pizzas.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
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

      {/* Featured Pizzas Preview */}
      <section className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Pizzas em Destaque
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
            className="inline-block text-red-500 font-semibold hover:underline"
          >
            Ver menu completo →
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-8 bg-gray-50 rounded-3xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            A Melhor Pizza da Cidade
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Há mais de 10 anos servindo as melhores pizzas com ingredientes
            frescos e massa artesanal. Nossa missão é proporcionar momentos
            deliciosos para você e sua família.
          </p>
        </div>
      </section>
    </main>
  );
}
