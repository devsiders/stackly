"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { DevKit } from "@/types/category";

const itemsPerPage = 8;

const categoryLabels: Record<string, string> = {
  all: "Todos",
  libraries: "Librerías",
  icons: "Íconos",
  fonts: "Fuentes",
  tools: "Herramientas",
  nocode: "No Code",
};

interface Props {
  kits: DevKit[];
}

export default function DevKits({ kits }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  // Filtrar por categoría + búsqueda
  const filteredKits = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return kits.filter((kit) => {
      const matchesCategory =
        activeCategory === "all" || kit.category === activeCategory;

      const matchesSearch =
        kit.name.toLowerCase().includes(search) ||
        kit.description.toLowerCase().includes(search) ||
        kit.tags.some((t) => t.toLowerCase().includes(search));

      return matchesCategory && matchesSearch;
    });
  }, [kits, activeCategory, searchTerm]);

  // Slice que muestra solo los visibles
  const paginatedKits = useMemo(
    () => filteredKits.slice(0, visibleCount),
    [filteredKits, visibleCount]
  );

  // Reiniciar visibleCount cuando cambian filtros o búsqueda
  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [searchTerm, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">DevKit Resources</h1>

        {/* Buscador */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categorías */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-full border transition ${
              activeCategory === key
                ? "bg-purple-600 text-white border-purple-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cantidad encontrada */}
      <p className="text-gray-600 text-center mb-6">
        {filteredKits.length} recursos encontrados
        {activeCategory !== "all" && (
          <span className="ml-1">en {categoryLabels[activeCategory]}</span>
        )}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedKits.map((kit) => (
          <a
            key={kit.id}
            href={kit.url}
            target="_blank"
            className="p-5 border rounded-xl shadow hover:shadow-lg transition bg-white"
          >
            {kit.logo && (
              <img
                src={kit.logo}
                alt={kit.name}
                className="h-12 mx-auto mb-4 object-contain"
              />
            )}
            <h3 className="text-lg font-semibold">{kit.name}</h3>
            <p className="text-gray-600 text-sm mt-2">{kit.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {kit.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Botón Ver más */}
      {visibleCount < filteredKits.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + itemsPerPage)}
            className="px-6 py-3 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
}
