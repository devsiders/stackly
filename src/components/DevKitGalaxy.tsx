import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

const KITS_PER_PAGE = 12;
const MAX_VISIBLE_TAGS = 12;

const DevKitGalaxy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('all');
  const [tagSearch, setTagSearch] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const baseFilteredKits = useMemo(() => {
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

  const tagOptions = useMemo(() => {
    const normalized = new Map<string, { label: string; count: number }>();

    baseFilteredKits.forEach((kit) => {
      kit.tags.forEach((tag) => {
        const key = tag.trim().toLowerCase();
        if (!key) {
          return;
        }

        if (normalized.has(key)) {
          const current = normalized.get(key);
          if (current) {
            normalized.set(key, { ...current, count: current.count + 1 });
          }
        } else {
          normalized.set(key, { label: tag.trim(), count: 1 });
        }
      });
    });

    return Array.from(normalized.entries())
      .map(([key, value]) => ({ key, label: value.label, count: value.count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es'));
  }, [baseFilteredKits]);

  const filteredKits = useMemo(() => {
    if (activeTag === 'all') {
      return baseFilteredKits;
    }

    return baseFilteredKits.filter((kit) =>
      kit.tags.some((tag) => tag.trim().toLowerCase() === activeTag)
    );
  }, [activeTag, baseFilteredKits]);

  const filteredTagOptions = useMemo(() => {
    const normalizedTerm = tagSearch.trim().toLowerCase();
    if (!normalizedTerm) {
      return tagOptions;
    }

    return tagOptions.filter((tag) => tag.label.toLowerCase().includes(normalizedTerm));
  }, [tagOptions, tagSearch]);

  const tagsToShow = useMemo(() => {
    if (showAllTags) {
      return filteredTagOptions;
    }

    let visibleTags = filteredTagOptions.slice(0, MAX_VISIBLE_TAGS);
    if (activeTag !== 'all' && !visibleTags.some((tag) => tag.key === activeTag)) {
      const activeTagOption = filteredTagOptions.find((tag) => tag.key === activeTag);
      if (activeTagOption) {
        visibleTags = [activeTagOption, ...visibleTags.slice(0, MAX_VISIBLE_TAGS - 1)];
      }
    }

    return visibleTags;
  }, [activeTag, filteredTagOptions, showAllTags]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, activeTag]);

  useEffect(() => {
    if (activeTag !== 'all' && !tagOptions.some((tag) => tag.key === activeTag)) {
      setActiveTag('all');
    }
  }, [activeTag, tagOptions]);

  useEffect(() => {
    setShowAllTags(false);
  }, [searchTerm, activeCategory]);

  const totalPages = Math.ceil(filteredKits.length / KITS_PER_PAGE);
  const startIndex = (currentPage - 1) * KITS_PER_PAGE;
  const kitsToShow = filteredKits.slice(startIndex, startIndex + KITS_PER_PAGE);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const visiblePages = useMemo(() => {
    if (totalPages <= 0) {
      return [];
    }

    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    let start = Math.max(1, currentPage - 1);
    let end = start + 2;

    if (end > totalPages) {
      end = totalPages;
      start = end - 2;
    }

    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  }, [currentPage, totalPages]);

  const handlePrevPage = () => {
    if (canGoPrev) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (canGoNext) {
      setCurrentPage(prev => prev + 1);
    }
  };

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

        {/* Contenedor estable para evitar saltos de paginación */}
        <div className="min-h-[850px] md:min-h-[1050px] flex flex-col pb-10">
          {/* Contador */}
          <p className="text-gray-600 text-center">
            {filteredKits.length} recursos encontrados
            {activeCategory !== "all" && (
              <span className="ml-1">en {categoryLabels[activeCategory]}</span>
            )}
            {activeTag !== 'all' && (
              <span className="ml-1">con etiqueta #{tagOptions.find((tag) => tag.key === activeTag)?.label || activeTag}</span>
            )}
          </p>

          {/* Contenido */}
          {kitsToShow.length ? (
            <div 
              key={`${currentPage}-${activeCategory}-${activeTag}-${searchTerm}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
            >
              {kitsToShow.map((kit) => (
                <DevKitCard key={kit.id + kit.name} kit={kit} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-600 flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron resultados</h3>
              <p>Intenta con otros términos o cambia la categoría</p>
            </div>
          )}

          {/* Paginación dentro del contenedor estable */}
          {totalPages > 1 && (
            <div className="mt-auto pt-16 flex flex-wrap items-center justify-center gap-2">
              <Button
                onClick={handlePrevPage}
                disabled={!canGoPrev}
                variant="outline"
                className="rounded-full px-4"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>

              {visiblePages.map((page) => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  className="rounded-full min-w-10 px-3"
                >
                  {page}
                </Button>
              ))}

              <Button
                onClick={handleNextPage}
                disabled={!canGoNext}
                variant="outline"
                className="rounded-full px-4"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>

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
