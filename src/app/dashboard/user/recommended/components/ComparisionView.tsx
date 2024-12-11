import { motion } from 'framer-motion';
import { Sparkles, Percent, Wallet, Clock, Users, Lock, Landmark, FileText } from 'lucide-react';
import { SchemeComparison } from '@/data/schemeDetailsType';
import { SchemeCard } from './SchemeCard';

interface ComparisonViewProps {
  comparison: SchemeComparison;
}

export const ComparisonView = ({ comparison }: ComparisonViewProps) => {
  const { scheme1, scheme2 } = comparison;

  const comparisonRows = [
    { 
      label: 'Interest Rate',
      icon: <Percent className="w-5 h-5" />,
      param: 'interestRate'
    },
    { 
      label: 'Minimum Deposit',
      icon: <Wallet className="w-5 h-5" />,
      param: 'minimumDeposit'
    },
    { 
      label: 'Maximum Deposit',
      icon: <Wallet className="w-5 h-5" />,
      param: 'maximumDeposit'
    },
    { 
      label: 'Tenure',
      icon: <Clock className="w-5 h-5" />,
      param: 'tenure'
    },
    { 
      label: 'Eligibility',
      icon: <Users className="w-5 h-5" />,
      param: 'eligibility'
    },
    { 
      label: 'Tax Benefits',
      icon: <Landmark className="w-5 h-5" />,
      param: 'taxBenefits'
    },
    { 
      label: 'Premature Withdrawal',
      icon: <Lock className="w-5 h-5" />,
      param: 'prematureWithdrawal'
    },
    { 
      label: 'Account Type',
      icon: <FileText className="w-5 h-5" />,
      param: 'accountType'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 space-y-6"
    >
      {/* Scheme Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Comparison Summary</h3>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
            <p className="text-blue-600 text-base font-medium">3 Key Differences</p>
          </div>
        </div>
        <SchemeCard scheme={scheme1} />
        <SchemeCard scheme={scheme2} />
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <tbody>
            {comparisonRows.map((row, idx) => (
              <tr 
                key={row.param}
                className={`
                  group hover:bg-blue-50/30 transition-colors duration-300
                  ${idx !== comparisonRows.length - 1 ? 'border-b border-gray-100' : ''}
                `}
              >
                <td className="py-6 px-8 w-1/3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                      {row.icon}
                    </div>
                    <h4 className="text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      {row.label}
                    </h4>
                  </div>
                </td>
                <td className="py-6 px-8 w-1/3 border-x border-gray-100">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {scheme1.parameters[row.param as keyof typeof scheme1.parameters]}
                    </p>
                  </div>
                </td>
                <td className="py-6 px-8 w-1/3">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="text-base text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                      {scheme2.parameters[row.param as keyof typeof scheme2.parameters]}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
