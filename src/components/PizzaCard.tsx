"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { Pizza } from "@/data/pizzas";

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart?: (pizza: Pizza, size: string) => void;
}

export default function PizzaCard({ pizza, onAddToCart }: PizzaCardProps) {
  const [selectedSize, setSelectedSize] = useState("regular");
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Cores alinhadas com a identidade visual do projeto (tons mais claros)
  const getCardColors = (pizzaId: string) => {
    const colors = {
      'cheese-lovers': 'from-orange-25 to-red-25 border-orange-100',
      'pepperoni': 'from-red-25 to-orange-25 border-red-100', 
      'margherita': 'from-red-25 to-pink-25 border-red-100',
      'hawaiian': 'from-orange-25 to-yellow-25 border-orange-100',
      'meat-lovers': 'from-red-25 to-red-50 border-red-100',
      'veggie-supreme': 'from-orange-25 to-green-25 border-orange-100'
    };
    return colors[pizzaId as keyof typeof colors] || 'from-red-25 to-orange-25 border-red-100';
  };

  const handleAddToCart = useCallback(() => {

    if (onAddToCart) {
      onAddToCart(pizza, selectedSize);
    }


    if (typeof window !== 'undefined' && imageRef.current) {
      try {
        const cartIcon = document.querySelector('.cart-icon-container');
        
        if (cartIcon) {
          const pizzaImg = imageRef.current;
          const imgClone = pizzaImg.cloneNode(true) as HTMLElement;
          
          const imgRect = pizzaImg.getBoundingClientRect();
          const cartRect = cartIcon.getBoundingClientRect();


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


          setTimeout(() => {
            imgClone.style.left = cartRect.left + cartRect.width / 2 + 'px';
            imgClone.style.top = cartRect.top + cartRect.height / 2 + 'px';
            imgClone.style.width = '0px';
            imgClone.style.height = '0px';
            imgClone.style.opacity = '0.5';
          }, 50);


          setTimeout(() => {
            if (document.body.contains(imgClone)) {
              imgClone.remove();
            }
            

            cartIcon.classList.add('cart-bounce');
            setTimeout(() => {
              cartIcon.classList.remove('cart-bounce');
            }, 400);


            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('cart-updated'));
            }
          }, 1000);
        } else {

          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('cart-updated'));
          }
        }
      } catch (error) {
        console.warn('Animation error:', error);

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('cart-updated'));
        }
      }
    }
  }, [pizza, selectedSize, onAddToCart]);

  return (
    <article className={`bg-gradient-to-br ${getCardColors(pizza.id)} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2`}>
      <figure className="mb-4 flex justify-center">
        <Image
          ref={imageRef}
          src={pizza.image}
          alt={pizza.name}
          width={200}
          height={200}
          className="object-contain"
        />
      </figure>

      <h3 className="text-xl font-bold mb-2">{pizza.name}</h3>
      <p className="text-gray-600 text-sm mb-4 min-h-[40px]">
        {pizza.description}
      </p>

      <p className="text-2xl font-bold text-green-500 mb-4">
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

      <div className="flex gap-2">
        <Link 
          href={`/pizza/${pizza.id}`}
          className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:scale-105"
        >
          VIEW DETAILS
        </Link>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          ADD TO CART
        </button>
      </div>
    </article>
  );
}