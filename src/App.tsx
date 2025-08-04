import React, { useState } from 'react';
import { Globe, Cable, Bird, Fan, Activity, Home } from 'lucide-react';
import DomainInput from './components/DomainInput';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ResultsDisplay from './components/ResultsDisplay';
import IPTools from './components/IPTools';

interface AnalysisResults {
  dns?: any;
  connectivity?: any;
  dnsCheck?: any;
}

function App() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<AnalysisResults>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'analysis' | 'ip-tools'>('home');

  const performAnalysis = async (targetDomain: string) => {
    setLoading(true);
    setError('');
    setDomain(targetDomain);
    setAnalysisComplete(false);
    setResults({});
    setCurrentView('analysis');

    try {
      const endpoints = [
        { key: 'dns', url: `/api/dns/${targetDomain}` },
        { key: 'connectivity', url: `/api/connectivity/${targetDomain}` },
        { key: 'dnsCheck', url: `/api/dns-check/${targetDomain}` }
      ];

      const promises = endpoints.map(endpoint =>
        fetch(`http://localhost:3001${endpoint.url}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`${endpoint.key} analysis failed: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => ({ key: endpoint.key, data }))
          .catch(error => ({ key: endpoint.key, error: error.message }))
      );

      const responses = await Promise.allSettled(promises);
      const newResults: AnalysisResults = {};
      let hasErrors = false;
      const errorMessages: string[] = [];

      responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
          const { key, data, error } = response.value;
          if (error) {
            errorMessages.push(`${key}: ${error}`);
            hasErrors = true;
          } else {
            newResults[key as keyof AnalysisResults] = data;
          }
        } else {
          const endpoint = endpoints[index];
          errorMessages.push(`${endpoint.key}: ${response.reason}`);
          hasErrors = true;
        }
      });

      setResults(newResults);
      
      if (hasErrors && Object.keys(newResults).length === 0) {
        setError(`Analysis failed: ${errorMessages.join(', ')}`);
      } else {
        setAnalysisComplete(true);
        if (hasErrors) {
          console.warn('Some analyses failed:', errorMessages);
        }
      }

    } catch (error) {
      setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (domain) {
      performAnalysis(domain);
    }
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    setAnalysisComplete(false);
    setResults({});
    setError('');
    setDomain('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-700 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-1"></div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce opacity-15"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-2/3 left-1/6 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping opacity-25"></div>
        <div className="absolute top-1/6 right-2/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-15"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black bg-opacity-70 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-white-600 to-white-600 p-2 rounded-lg shadow-2xl animate-none">
                  <Cable className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">DNS DeepScan</h1>
                  <p className="text-sm text-gray-400">Comprehensive Domain Analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleHomeClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => window.location.href = "https://amirfaramarzpour.ir"}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 bg-opacity-50 backdrop-blur-md text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 border border-gray-700 hover:border-gray-600 hover:shadow-lg"
                >
                  <Home className="w-4 h-4" />
                  <span>amirfaramarzpour.ir</span>
                </button>

                <div className="flex items-center space-x-2">
                  <Activity className={`w-5 h-5 ${loading ? 'text-blue-400 animate-pulse' : 'text-gray-400'}`} />
                  <span className="text-sm text-gray-400">
                    {loading ? (
                      <span className="text-blue-400 animate-pulse">Running...</span>
                    ) : analysisComplete ? (
                      <span className="text-green-400 animate-fade-in">Job Completed</span>
                    ) : (
                      'Server Ready'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'home' && !loading && !error && (
            <div className="text-center py-16">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-white-600 to-black-600 rounded-full mb-6 shadow-2xl animate-spin">
                  <Fan className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
                  Domain Intelligence Suite	
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-delay">
                  Easily check your network setup—including DNS records, connection status, DNS consistency, and detailed IP information—all in one place.
                </p>
              </div>
              
              <DomainInput onAnalyze={performAnalysis} loading={loading} />
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto animate-slide-up">
                <div className="bg-gray-900 bg-opacity-1 backdrop-blur-xl rounded-xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:bg-opacity-60 group">
                  <Globe className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">DNS Analysis</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Complete DNS record analysis with response time visualization</p>
                </div>
                <div className="bg-gray-900 bg-opacity-1 backdrop-blur-xl rounded-xl p-8 border border-gray-800 hover:border-teal-500 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/20 hover:bg-opacity-60 group">
                  <Activity className="w-8 h-8 text-teal-400 mb-3" />
                  <h3 className="font-semibold text-white mb-3 group-hover:text-teal-300 transition-colors">Connectivity Tests</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Advanced ping analysis, HTTP status checks, and port availability</p>
                </div>
                <div className="bg-gray-900 bg-opacity-1 backdrop-blur-xl rounded-xl p-8 border border-gray-800 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:bg-opacity-60 group md:col-span-2 lg:col-span-1">
                  <Activity className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">DNS Consistency</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Multi-resolver DNS consistency checks with interactive visualization</p>
                </div>
              </div>
              
              <div className="mt-12">
                <button
                  onClick={() => setCurrentView('ip-tools')}
                  className="px-16 py-2 bg-gradient-to-r from-white-600 to-black-600 text-white rounded-xl hover:from-blue-700 hover:to-black-700 transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:scale-110 font-semibold text-lg"
                >
                  🔍 Explore IP Tools
                </button>
              </div>
            </div>
          )}

          {currentView === 'ip-tools' && (
            <IPTools />
          )}

          {loading && (
            <div className="py-16">
              <LoadingSpinner size="lg" text="Performing comprehensive analysis..." />
              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-6">Analyzing: <span className="font-mono font-medium text-blue-400 animate-pulse">{domain}</span></p>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>DNS Records</span>
                    <span>Connectivity</span>
                    <span>DNS Check</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full animate-pulse shadow-lg" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="py-16">
              <ErrorMessage
                message={error}
                onRetry={handleRetry}
              />
            </div>
          )}

          {currentView === 'analysis' && analysisComplete && Object.keys(results).length > 0 && (
            <div className="py-8">
              <ResultsDisplay results={results} domain={domain} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-black bg-opacity-70 backdrop-blur-xl border-t border-gray-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                DNS DeepScan - Domain Intelligence Suite
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Copyright 2025-2026 amirfaramarzpour.ir
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 1.2s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}

export default App;