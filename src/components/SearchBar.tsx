"use client";

import Image from "next/image";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Image
            src="/images/search.png"
            alt="Search"
            width={20}
            height={20}
          />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your favorite flavor..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>
      {searchTerm && (
        <p className="text-center text-sm text-gray-600 mt-2">
          Buscando por: <span className="font-semibold">"{searchTerm}"</span>
        </p>
      )}
    </div>
  );
}