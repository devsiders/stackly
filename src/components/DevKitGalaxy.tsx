import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Asumo que tienes un componente Button, si no, puedes usar un <button> estándar.
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

const KITS_PER_LOAD = 10; // Constante para la cantidad de kits a mostrar

const DevKitGalaxy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  // 1. Estado para el control de la paginación simple
  const [visibleKitsCount, setVisibleKitsCount] = useState(KITS_PER_LOAD);

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

  // 4. Resetear el contador de kits visibles al cambiar filtros/búsqueda
  useEffect(() => {
    setVisibleKitsCount(KITS_PER_LOAD);
  }, [filteredKits]);

  // 5. Determinar qué kits mostrar (el corte/slice)
  const kitsToShow = filteredKits.slice(0, visibleKitsCount);

  // 2. Función para cargar más kits
  const showMoreKits = () => {
    setVisibleKitsCount(prevCount => prevCount + KITS_PER_LOAD);
  };

  // 6. Verificar si hay más kits por mostrar
  const hasMoreKits = filteredKits.length > visibleKitsCount;

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
        <p className="text-gray-600 text-center">
          {filteredKits.length} recursos encontrados
          {activeCategory !== "all" && (
            <span className="ml-1">en {categoryLabels[activeCategory]}</span>
          )}
        </p>

        {/* Contenido */}
        {kitsToShow.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Usar kitsToShow en lugar de filteredKits */}
            {kitsToShow.map((kit) => (
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

        {/* 7. Botón "Ver Más" */}
        {hasMoreKits && (
          <div className="text-center mt-10">
            <Button
              onClick={showMoreKits}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Ver Más ({filteredKits.length - visibleKitsCount} restantes)
            </Button>
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