import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pizzas } from "@/data/pizzas";
import AddToCartButton from "@/components/AddToCartButton";

// SSG com rotas dinâmicas
// generateStaticParams gera todas as páginas possíveis em build time
// Justificativa: Número fixo de pizzas, conteúdo estático, SEO otimizado

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
        className="inline-flex items-center text-red-500 hover:text-red-600 mb-6"
      >
        ← Voltar ao Menu
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
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

        {/* Info Section */}
        <div>
          <div className="bg-orange-100 text-orange-800 inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4">
            {pizza.category}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{pizza.name}</h1>
          
          <p className="text-xl text-gray-600 mb-6">{pizza.description}</p>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">Ingredientes:</h3>
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
            <p className="text-sm text-gray-600 mb-2">Preço</p>
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

      {/* Nutritional Info */}
      <section className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Informações Nutricionais</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">320</p>
            <p className="text-gray-600">Calorias</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">12g</p>
            <p className="text-gray-600">Proteína</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">35g</p>
            <p className="text-gray-600">Carboidratos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">15g</p>
            <p className="text-gray-600">Gordura</p>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <div className="mt-12 bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-2 text-purple-900">
          🎯 Sobre esta página (Rota Dinâmica + SSG)
        </h3>
        <p className="text-purple-800 text-sm">
          Esta é uma <strong>rota dinâmica</strong> usando{" "}
          <strong>SSG com generateStaticParams</strong>. Todas as páginas de
          detalhes de pizzas foram geradas estaticamente no build time,
          oferecendo performance máxima e SEO perfeito. A URL muda baseada no
          ID da pizza, mas o conteúdo foi pré-renderizado.
        </p>
      </div>
    </main>
  );
}