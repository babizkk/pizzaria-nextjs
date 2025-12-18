import MenuClient from "@/components/MenuClient";
import { pizzas } from "@/data/pizzas";

export const revalidate = 3600;

export default function MenuPage() {
  return (
    <main className="py-8">
      <section>
        <h1 className="text-4xl font-bold text-center mb-8">
          Recommended Menu
        </h1>


        <MenuClient pizzas={pizzas} />
      </section>
    </main>
  );
}