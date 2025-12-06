import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import DevKitCard from './DevKitCard';
import { allDevKits } from '@/data';

const categoryLabels = {
  libraries: "Librerías",
  icons: "Iconos",
  fonts: "Fuentes",
  tools: "Herramientas",
  nocode: "No-Code"
};

const DevKitGalaxy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredKits = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return allDevKits.filter(kit => {
      const matchCat = activeCategory === 'all' || kit.category === activeCategory;
      const matchText =
        kit.name.toLowerCase().includes(term) ||
        kit.description.toLowerCase().includes(term) ||
        kit.tags?.some(tag => tag.toLowerCase().includes(term));
      return matchCat && (!term || matchText);
    });
  }, [searchTerm, activeCategory]);

  const totalPages = Math.ceil(filteredKits.length / itemsPerPage);

  const paginatedKits = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredKits.slice(start, start + itemsPerPage);
  }, [filteredKits, currentPage]);

  useEffect(() => setCurrentPage(1), [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Buscador */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar kits, librerías, iconos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 rounded-full border-2 border-gray-200 focus:border-purple-400 transition"
            />
          </div>
        </div>

        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Contador */}
        <p className="text-gray-600">
          {filteredKits.length} recursos encontrados
          {activeCategory !== "all" && (
            <span className="ml-1">en {categoryLabels[activeCategory]}</span>
          )}
        </p>

        {/* Contenido */}
        {filteredKits.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {paginatedKits.map((kit) => (
              <DevKitCard key={kit.id + kit.name} kit={kit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14 text-gray-600">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
            <p>Intenta con otros términos o cambia la categoría</p>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 mt-10">

            {/* Flechas */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-2 bg-purple-200 text-purple-700 rounded-full disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-gray-700 font-medium">
                {currentPage} de {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-2 bg-purple-200 text-purple-700 rounded-full disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Números */}
            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "bg-purple-200 text-purple-700 hover:bg-purple-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">Hecho con ❤️ para la comunidad</p>
        </div>
      </footer>
    </div>
  );
};

export default DevKitGalaxy;
