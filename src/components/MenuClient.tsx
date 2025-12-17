"use client";

import { useState, useMemo } from "react";
import PizzaCard from "@/components/PizzaCard";
import SearchBar from "@/components/SearchBar";
import { Pizza } from "@/data/pizzas";

interface MenuClientProps {
  pizzas: Pizza[];
}

export default function MenuClient({ pizzas }: MenuClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar pizzas baseado no termo de busca
  // Busca no nome e nos ingredientes (igual ao código original)
  const filteredPizzas = useMemo(() => {
    if (!searchTerm.trim()) {
      return pizzas;
    }

    const searchLower = searchTerm.toLowerCase();

    return pizzas.filter((pizza) => {
      // Busca no nome
      const nameMatch = pizza.name.toLowerCase().includes(searchLower);

      // Busca nos ingredientes
      const ingredientsMatch = pizza.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchLower)
      );

      // Busca na descrição (adicional)
      const descriptionMatch = pizza.description
        .toLowerCase()
        .includes(searchLower);

      return nameMatch || ingredientsMatch || descriptionMatch;
    });
  }, [pizzas, searchTerm]);

  return (
    <>
      {/* Search Component */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Resultado da busca */}
      {searchTerm && (
        <div className="text-center mt-4 mb-2">
          <p className="text-gray-600">
            {filteredPizzas.length === 0 ? (
              <span className="text-red-500 font-semibold">
                Nenhuma pizza encontrada 😢
              </span>
            ) : (
              <span>
                Encontradas{" "}
                <span className="font-bold text-red-500">
                  {filteredPizzas.length}
                </span>{" "}
                {filteredPizzas.length === 1 ? "pizza" : "pizzas"}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Ops! Não encontramos essa pizza
            </h3>
            <p className="text-gray-600 mb-6">
              Tente buscar por outro sabor ou ingrediente
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
            >
              Ver todos os sabores
            </button>
          </div>
        )}
      </div>
    </>
  );
}
