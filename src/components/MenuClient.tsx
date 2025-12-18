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


  const filteredPizzas = useMemo(() => {
    if (!searchTerm.trim()) {
      return pizzas;
    }

    const searchLower = searchTerm.toLowerCase();

    return pizzas.filter((pizza) => {

      const nameMatch = pizza.name.toLowerCase().includes(searchLower);


      const ingredientsMatch = pizza.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchLower)
      );


      const descriptionMatch = pizza.description
        .toLowerCase()
        .includes(searchLower);

      return nameMatch || ingredientsMatch || descriptionMatch;
    });
  }, [pizzas, searchTerm]);

  return (
    <>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />


      {searchTerm && (
        <div className="text-center mt-4 mb-2">
          <p className="text-gray-600">
            {filteredPizzas.length === 0 ? (
              <span className="text-red-500 font-semibold">
                No pizzas found 😢
              </span>
            ) : (
              <span>
                Found{" "}
                <span className="font-bold text-red-500">
                  {filteredPizzas.length}
                </span>{" "}
                {filteredPizzas.length === 1 ? "pizza" : "pizzas"}
              </span>
            )}
          </p>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Oops! We couldn't find that pizza
            </h3>
            <p className="text-gray-600 mb-6">
              Try searching for another flavor or ingredient
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors"
            >
              View all flavors
            </button>
          </div>
        )}
      </div>
    </>
  );
}
