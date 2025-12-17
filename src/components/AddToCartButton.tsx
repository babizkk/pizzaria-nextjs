"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface AddToCartButtonProps {
  pizzaImage: string;
  pizzaName: string;
  onAddToCart?: () => void;
}

export default function AddToCartButton({ 
  pizzaImage, 
  pizzaName,
  onAddToCart 
}: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState("regular");
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAddToCart = () => {
    // Pegar a imagem principal da página
    const mainImage = document.querySelector('.pizza-detail-image') as HTMLElement;
    const cartIcon = document.querySelector('.cart-icon-container');
    
    if (mainImage && cartIcon) {
      const imgClone = mainImage.cloneNode(true) as HTMLElement;
      
      const imgRect = mainImage.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      // Estilizar o clone
      imgClone.style.position = 'fixed';
      imgClone.style.left = imgRect.left + 'px';
      imgClone.style.top = imgRect.top + 'px';
      imgClone.style.width = imgRect.width + 'px';
      imgClone.style.height = imgRect.height + 'px';
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

    // Callback
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold mb-2">
          Escolha o tamanho:
        </label>
        <select 
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="regular">Regular</option>
          <option value="medium">Medium (+$5.00)</option>
          <option value="large">Large (+$8.00)</option>
        </select>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-red-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors active:scale-95"
      >
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
}
