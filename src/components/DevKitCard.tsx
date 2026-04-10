import { ExternalLink, Github, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DevKit } from '@/types/devKits';

interface DevKitCardProps {
  kit: DevKit;
}

const DevKitCard = ({ kit }: DevKitCardProps) => {
  return (
    <Card className="p-6 card-glow hover:border-purple-300 transition-all duration-300 group h-full min-h-[180px] flex flex-col">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2">
            {kit.logo && (
              <img
                src={kit.logo}
                alt={`${kit.name} logo`}
                className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-purple-700 transition-colors">
              {kit.name}
            </h3>
            <div className="flex gap-2 ml-2">
              <a
                href={kit.url}
                target='_blank'
                className="p-1 hover:bg-purple-100 transition-all duration-500 rounded"
                aria-label={`Abrir página oficial de ${kit.name}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              {kit.github && (
                <a
                  href={kit.github}
                  target='_blank'
                  className="p-1 hover:bg-gray-100 transition-all duration-500 rounded"
                  aria-label={`Abrir repositorio de ${kit.name} en GitHub`}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {kit.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {kit.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs font-normal bg-purple-50 text-purple-500 hover:bg-purple-100 transition-colors"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {kit.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{kit.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DevKitCard;
