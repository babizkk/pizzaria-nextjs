import MenuClient from "@/components/MenuClient";
import { pizzas } from "@/data/pizzas";

// ISR: Incremental Static Regeneration com revalidação a cada 3600 segundos (1 hora)
// Justificativa: Conteúdo que pode mudar (preços, disponibilidade de pizzas)
// mas não precisa ser atualizado em tempo real. ISR oferece o melhor dos dois mundos:
// performance de SSG + atualização periódica automática sem rebuild completo

export const revalidate = 3600; // Revalida a cada 1 hora

export default function MenuPage() {
  return (
    <main className="py-8">
      <section>
        <h1 className="text-4xl font-bold text-center mb-8">
          Recommended Menu
        </h1>

        {/* Client Component com filtro funcional */}
        <MenuClient pizzas={pizzas} />

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2 text-blue-900">
            📊 Sobre esta página (ISR)
          </h3>
          <p className="text-blue-800 text-sm">
            Esta página utiliza <strong>ISR (Incremental Static Regeneration)</strong>.
            Foi gerada estaticamente no build, mas será revalidada automaticamente
            a cada 1 hora. Isso significa que mudanças no menu (como preços ou
            novas pizzas) serão atualizadas sem precisar fazer rebuild completo.
          </p>
        </div>
      </section>
    </main>
  );
}