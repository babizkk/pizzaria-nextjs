"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  // Listener para atualizar contador quando item é adicionado
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(prev => prev + 1);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  return (
    <nav className="bg-white rounded-3xl shadow-sm px-8 py-4 mb-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Pizza Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/menu"
            className="text-gray-700 hover:text-red-500 font-medium transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-red-500 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/promocoes"
            className="text-gray-700 hover:text-red-500 font-medium transition-colors"
          >
            Promoções
          </Link>

          <button className="relative">
            <Image
              src="/images/search.png"
              alt="Search"
              width={20}
              height={20}
            />
          </button>

          <button className="relative cart-icon-container">
            <Image
              src="/images/cart.png"
              alt="Cart"
              width={24}
              height={24}
              className="cart-icon"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors">
            SIGN IN
          </button>
        </div>
      </div>
    </nav>
  );
}