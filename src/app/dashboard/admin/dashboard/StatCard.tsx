import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    period: string;
  };
}

export default function StatCard({ title, value, change }: StatCardProps) {
  const isPositive = change && change.value > 0;
  const isNegative = change && change.value < 0;

  return (
    <div className="group relative overflow-hidden">
      {/* Background gradient that shifts on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 bg-white border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        {/* Subtle border gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-indigo-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative space-y-4">
          <h3 className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            {title}
          </h3>
          
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {value}
              </span>
              
              {change && (
                <div className={`flex items-center gap-1 text-sm font-medium
                  ${isPositive ? 'text-green-600' : ''}
                  ${isNegative ? 'text-red-600' : ''}
                  ${!isPositive && !isNegative ? 'text-gray-600' : ''}
                `}>
                  <div className="flex items-center">
                    {isPositive && (
                      <ArrowUp 
                        size={16} 
                        className="transition-transform group-hover:translate-y-[-2px]" 
                      />
                    )}
                    {isNegative && (
                      <ArrowDown 
                        size={16} 
                        className="transition-transform group-hover:translate-y-[2px]" 
                      />
                    )}
                    <span>{Math.abs(change.value)}%</span>
                  </div>
                </div>
              )}
            </div>
            
            {change && (
              <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                vs {change.period}
              </p>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full -translate-y-16 translate-x-16 group-hover:translate-y-[-4rem] group-hover:translate-x-20 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full translate-y-12 -translate-x-8 group-hover:translate-y-16 group-hover:-translate-x-12 transition-transform duration-500" />
      </div>
    </div>
  );
}
