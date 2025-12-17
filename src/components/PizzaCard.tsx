"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Pizza } from "@/data/pizzas";

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart?: (pizza: Pizza, size: string) => void;
}

export default function PizzaCard({ pizza, onAddToCart }: PizzaCardProps) {
  const [selectedSize, setSelectedSize] = useState("regular");
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAddToCart = () => {
    // Trigger animação
    if (imageRef.current) {
      const cartIcon = document.querySelector('.cart-icon-container');
      
      if (cartIcon) {
        const pizzaImg = imageRef.current;
        const imgClone = pizzaImg.cloneNode(true) as HTMLElement;
        
        const imgRect = pizzaImg.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        // Estilizar o clone
        imgClone.style.position = 'fixed';
        imgClone.style.left = imgRect.left + 'px';
        imgClone.style.top = imgRect.top + 'px';
        imgClone.style.width = pizzaImg.offsetWidth + 'px';
        imgClone.style.height = pizzaImg.offsetHeight + 'px';
        imgClone.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        imgClone.style.zIndex = '9999';
        imgClone.style.borderRadius = '50%';
        imgClone.style.pointerEvents = 'none';
        
        document.body.appendChild(imgClone);

        // Animar até o carrinho
        setTimeout(() => {
          imgClone.style.left = cartRect.left + cartRect.width / 2 + 'px';
          imgClone.style.top = cartRect.top + cartRect.height / 2 + 'px';
          imgClone.style.width = '0px';
          imgClone.style.height = '0px';
          imgClone.style.opacity = '0.5';
        }, 50);

        // Remover clone e animar carrinho
        setTimeout(() => {
          imgClone.remove();
          
          // Trigger bounce no carrinho
          cartIcon.classList.add('cart-bounce');
          setTimeout(() => {
            cartIcon.classList.remove('cart-bounce');
          }, 400);

          // Atualizar contador do carrinho
          window.dispatchEvent(new Event('cart-updated'));
        }, 1000);
      }
    }

    // Callback
    if (onAddToCart) {
      onAddToCart(pizza, selectedSize);
    }
  };

  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/pizza/${pizza.id}`}>
        <figure className="mb-4 flex justify-center">
          <Image
            ref={imageRef}
            src={pizza.image}
            alt={pizza.name}
            width={200}
            height={200}
            className="object-contain hover:scale-105 transition-transform"
          />
        </figure>
      </Link>

      <h3 className="text-xl font-bold mb-2">{pizza.name}</h3>
      <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
        {pizza.description}
      </p>

      <p className="text-2xl font-bold text-red-500 mb-4">
        ${pizza.price.toFixed(2)}
      </p>

      <div className="mb-4">
        <label htmlFor={`size-${pizza.id}`} className="sr-only">
          Choose pizza size
        </label>
        <select
          id={`size-${pizza.id}`}
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="regular">Regular</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
      >
        ADD TO CART
      </button>
    </article>
  );
}