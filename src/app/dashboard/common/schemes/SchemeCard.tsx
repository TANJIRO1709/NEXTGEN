import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { type FC } from 'react';
import { type Scheme } from '@/data/schemeData';

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard: FC<SchemeCardProps> = ({ scheme }) => {
  const IconComponent = scheme.icon;
  
  if (!IconComponent) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-[320px] flex flex-col"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 flex-1 flex flex-col"
      >
        <motion.div 
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
          >
            <IconComponent className="h-6 w-6 text-blue-600" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 45 }}
            className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowUpRight />
          </motion.div>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2"
        >
          {scheme.name}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-gray-600 text-sm line-clamp-3 flex-1"
        >
          {scheme.description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          {scheme.tags?.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
      <div className="relative h-0.5 w-full overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ 
            originX: 0.5,
            background: 'linear-gradient(90deg, transparent 0%, #3B82F6 50%, transparent 100%)'
          }}
          className="absolute inset-0" 
        />
      </div>
    </motion.div>
  );
};

export default SchemeCard;
