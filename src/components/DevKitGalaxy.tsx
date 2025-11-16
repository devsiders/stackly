import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import DevKitCard from './DevKitCard';
import { allDevKits } from '@/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DevKitGalaxy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtrar kits por categoría y búsqueda
  const filteredKits = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allDevKits.filter((kit) => {
      const matchCategory = activeCategory === 'all' || kit.category === activeCategory;
      const matchSearch =
        kit.name.toLowerCase().includes(term) ||
        kit.description.toLowerCase().includes(term) ||
        kit.tags?.some((tag) => tag.toLowerCase().includes(term));
      return matchCategory && (!term || matchSearch);
    });
  }, [searchTerm, activeCategory]);

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredKits.length / itemsPerPage);

  // Cortar lista para paginar
  const paginatedKits = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredKits.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredKits, currentPage]);

  // Resetear a la página 1 si cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar kits, librerías, iconos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-purple-400 transition-colors"
            />
          </div>
        </div>

        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {filteredKits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedKits.map((kit) => (
              <DevKitCard key={kit.id + kit.name} kit={kit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-600">
                Intenta con otros términos de búsqueda o cambia la categoría
              </p>
            </div>
          </div>
        )}

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-2 bg-purple-200 text-purple-700 rounded-full disabled:opacity-50"
              aria-label="Ir a la página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-gray-700 font-medium">
              {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-2 bg-purple-200 text-purple-700 rounded-full disabled:opacity-50"
              aria-label="Ir a la página siguiente"
            >
              <ChevronRight  className="w-5 h-5" />
            </button>
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
