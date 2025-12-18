"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { pizzas } from "@/data/pizzas";

export default function Home() {
  const featuredPizzas = pizzas.slice(0, 3);
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({});

  const handleAddToCart = (pizzaId: string, pizzaImage: string) => {
    const cartIcon = document.querySelector('.cart-icon');
    const pizzaImg = document.querySelector(`#pizza-${pizzaId} img`) as HTMLElement;
    
    if (pizzaImg && cartIcon) {
      const imgClone = pizzaImg.cloneNode(true) as HTMLElement;
      const imgRect = pizzaImg.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

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

      setTimeout(() => {
        imgClone.style.left = cartRect.left + cartRect.width / 2 + 'px';
        imgClone.style.top = cartRect.top + cartRect.height / 2 + 'px';
        imgClone.style.width = '0px';
        imgClone.style.height = '0px';
        imgClone.style.opacity = '0.5';
      }, 50);

      setTimeout(() => {
        imgClone.remove();
        const cartContainer = document.querySelector('.cart-icon-container');
        if (cartContainer) {
          cartContainer.classList.add('cart-bounce');
          setTimeout(() => {
            cartContainer.classList.remove('cart-bounce');
          }, 400);
        }
        window.dispatchEvent(new Event('cart-updated'));
      }, 1000);
    }
  };

  return (
    <main id="main">
      <section className="header-homepage">
          <div className="header-content">
            <h1 className="friday-pizza">Friday pizza!</h1>
            <p className="friday-pizza-subtitle">Time to enjoy our delicious pizza.</p>
            <Link href="#menu" className="order-button">ORDER NOW</Link>
          </div>

          <figure className="header-image">
            <Image
              src="/images/header.png"
              alt="Delicious Pizza"
              width={700}
              height={600}
              className="pizza-header-image"
              priority
            />
          </figure>
        </section>

        <section id="menu" aria-labelledby="menu-title">
          <h2 id="menu-title">Recommended Menu</h2>
          
          <div className="cards">
            {featuredPizzas.map((pizza) => (
              <article
                key={pizza.id}
                id={`pizza-${pizza.id}`}
                className="pizza-card"
                data-name={pizza.name.toLowerCase()}
              >
                <figure className="pizza-figure">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    width={280}
                    height={280}
                    className="object-contain"
                  />
                </figure>
                
                <h3 className="pizza-name">{pizza.name}</h3>
                <p className="pizza-description">
                  {pizza.description}
                </p>
                
                <p className="pizza-price">
                  ${pizza.price.toFixed(2)}
                </p>
                
                <div className="text-center space-y-2 mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Sizes:</span> Regular • Medium • Large
                  </div>
                  <Link 
                    href={`/pizza/${pizza.id}`}
                    className="text-xs text-gray-500 italic hover:text-red-500 transition-colors cursor-pointer"
                  >
                    View ingredients →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/menu"
              className="inline-block bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                fontSize: '1rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              View full menu
            </Link>
          </div>
        </section>
      </main>
  );
}