import React from 'react';
import { MapPin, Clock, Hash } from 'lucide-react';

interface Hop {
  hop: number;
  hostname: string;
  ip: string;
  time: number;
}

interface NetworkGraphProps {
  hops: Hop[];
  summary?: {
    totalHops: number;
    minTime: number;
    maxTime: number;
    avgTime: number;
  };
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ hops, summary }) => {
  if (!hops || hops.length === 0) {
    return (
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Network Route Visualization</h3>
        <div className="flex items-center justify-center py-8 text-gray-400">
          <p>No routing data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700 animate-fade-in">
      <h3 className="text-lg font-semibold text-white mb-6">Network Route Visualization</h3>
      
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-900 bg-opacity-30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-300">Total Hops</span>
            </div>
            <p className="text-xl font-bold text-blue-400 mt-1">{summary.totalHops}</p>
          </div>
          
          <div className="bg-green-900 bg-opacity-30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-300">Min Time</span>
            </div>
            <p className="text-xl font-bold text-green-400 mt-1">{summary.minTime.toFixed(2)} ms</p>
          </div>
          
          <div className="bg-orange-900 bg-opacity-30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-300">Max Time</span>
            </div>
            <p className="text-xl font-bold text-orange-400 mt-1">{summary.maxTime.toFixed(2)} ms</p>
          </div>
          
          <div className="bg-purple-900 bg-opacity-30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-300">Avg Time</span>
            </div>
            <p className="text-xl font-bold text-purple-400 mt-1">{summary.avgTime.toFixed(2)} ms</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {hops.map((hop, index) => (
          <div key={hop.hop} className="relative">
            <div className="flex items-center space-x-4 p-4 bg-black bg-opacity-30 rounded-lg border border-gray-600">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {hop.hop}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-medium text-white truncate">
                    {hop.hostname}
                  </p>
                </div>
                <p className="text-sm text-gray-300">{hop.ip}</p>
              </div>
              
              <div className="flex-shrink-0">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{hop.time.toFixed(2)} ms</p>
                  <div className="w-16 bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((hop.time / (summary?.maxTime || hop.time)) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {index < hops.length - 1 && (
              <div className="absolute left-4 top-16 w-0.5 h-4 bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkGraph;