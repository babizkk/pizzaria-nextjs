"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();


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
    <header className="nav-bar">
      <div className="pizza-icon-navbar">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Pizza Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
      </div>

      <div className="redirect-links">
        <div className="options-list">
          <Link 
            href="/menu" 
            className={pathname === '/menu' ? 'option-2' : 'option-1'}
          >
            Menu
          </Link>
          <Link 
            href="/" 
            className={pathname === '/' ? 'option-2' : 'option-1'}
          >
            Home
          </Link>
          <p className="option-3">
            Promo
          </p>

          <Link href="/menu">
            <Image
              src="/images/search.png"
              alt="Search"
              width={25}
              height={25}
              className="search-icon"
            />
          </Link>
          
          <button className="cart-icon-container relative" style={{background: 'none', border: 'none', padding: 0}}>
            <Image
              src="/images/cart.png"
              alt="Cart"
              width={25}
              height={25}
              className="cart-icon"
            />
            {cartCount > 0 && (
              <span 
                className="absolute bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                style={{
                  top: '-8px',
                  right: '25px',
                  fontSize: '10px',
                  minWidth: '20px',
                  height: '20px'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button className="sign-in-button">
            SIGN IN
          </button>
        </div>
      </div>
    </header>
  );
}