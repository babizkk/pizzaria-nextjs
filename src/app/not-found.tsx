import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-8">
        <Image
          src="/images/logo.png"
          alt="Pizza Logo"
          width={100}
          height={100}
          className="opacity-50"
        />
      </div>
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-700 mb-4">
        Pizza não encontrada! 🍕
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Parece que essa pizza saiu para entrega e não voltou. Que tal escolher
        outra opção deliciosa?
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
        >
          Voltar para Home
        </Link>
        <Link
          href="/menu"
          className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
        >
          Ver Menu
        </Link>
      </div>
    </div>
  );
}
