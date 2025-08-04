import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface DomainInputProps {
  onAnalyze: (domain: string) => void;
  loading: boolean;
}

const DomainInput: React.FC<DomainInputProps> = ({ onAnalyze, loading }) => {
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');

  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return domainRegex.test(domain) && domain.length <= 253;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    if (!validateDomain(domain.trim())) {
      setError('Please enter a valid domain name');
      return;
    }

    setError('');
    onAnalyze(domain.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  const exampleDomains = ['google.com', 'github.com', 'stackoverflow.com'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);
              if (error) setError('');
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter domain name (e.g., example.com)"
            className="w-full px-4 py-4 pl-12 pr-16 text-lg bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-white"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-sm animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">Try these examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {exampleDomains.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setDomain(example)}
                className="px-4 py-2 text-sm bg-gray-800 bg-opacity-50 backdrop-blur-md text-gray-300 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-600"
                disabled={loading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DomainInput;