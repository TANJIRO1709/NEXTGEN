import { ArrowRight } from 'lucide-react';
import { SchemeDetails } from '@/data/schemeDetailsType';
import { getSchemeIcon } from './utils';

interface SchemeCardProps {
  scheme: SchemeDetails;
}

export const SchemeCard = ({ scheme }: SchemeCardProps) => {
  return (
    <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-start gap-4">
        <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-100/80 transition-colors duration-300">
          {getSchemeIcon(scheme.icon)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {scheme.name}
            </h3>
            <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <p className="text-base text-gray-600 mb-3 line-clamp-2">{scheme.description}</p>
          <div className="flex flex-wrap gap-2">
            {scheme.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium
                         group-hover:bg-blue-100/80 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
