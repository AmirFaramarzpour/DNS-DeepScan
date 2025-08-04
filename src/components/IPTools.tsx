import React, { useState } from 'react';
import { MapPin, Wifi, ArrowRightLeft, Search, Globe, Activity } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const IPTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ip-lookup');
  const [ipLookupInput, setIpLookupInput] = useState('');
  const [ipv6Input, setIpv6Input] = useState('');
  const [ipLookupResult, setIpLookupResult] = useState<any>(null);
  const [ispResult, setIspResult] = useState<any>(null);
  const [ipv6Result, setIpv6Result] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tabs = [
    { id: 'ip-lookup', label: 'IP Location Finder', icon: MapPin },
    { id: 'my-isp', label: 'What is My ISP', icon: Wifi },
    { id: 'ipv6-converter', label: 'IPv6 to IPv4 Converter', icon: ArrowRightLeft }
  ];

  const validateIP = (ip: string): boolean => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const validateIPv6 = (ip: string): boolean => {
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    return ipv6Regex.test(ip);
  };

  const handleIPLookup = async () => {
    if (!ipLookupInput.trim()) {
      setError('Please enter an IP address');
      return;
    }

    if (!validateIP(ipLookupInput.trim())) {
      setError('Please enter a valid IP address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:3001/api/ip-lookup/${ipLookupInput.trim()}`);
      if (!response.ok) {
        throw new Error('IP lookup failed');
      }
      const data = await response.json();
      setIpLookupResult(data);
    } catch (error) {
      setError(`IP lookup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleISPLookup = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/my-isp');
      if (!response.ok) {
        throw new Error('ISP lookup failed');
      }
      const data = await response.json();
      setIspResult(data);
    } catch (error) {
      setError(`ISP lookup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleIPv6Conversion = async () => {
    if (!ipv6Input.trim()) {
      setError('Please enter an IPv6 address');
      return;
    }

    if (!validateIPv6(ipv6Input.trim())) {
      setError('Please enter a valid IPv6 address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/ipv6-to-ipv4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipv6: ipv6Input.trim() }),
      });
      
      if (!response.ok) {
        throw new Error('IPv6 conversion failed');
      }
      const data = await response.json();
      setIpv6Result(data);
    } catch (error) {
      setError(`IPv6 conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const renderIPLookupTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          <span>IP Address Location Finder</span>
        </h3>
        <p className="text-gray-300 mb-6">
          Get real-time information associated with any IP address, including country, city, ISP, and geographic coordinates.
        </p>
        
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={ipLookupInput}
            onChange={(e) => setIpLookupInput(e.target.value)}
            placeholder="Enter IP address (e.g., 8.8.8.8)"
            className="flex-1 px-4 py-3 bg-black bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleIPLookup}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Looking up...' : 'Lookup'}</span>
          </button>
        </div>

        {ipLookupResult && (
          <div className="bg-black bg-opacity-30 rounded-lg p-6 animate-slide-up">
            <h4 className="text-lg font-semibold text-white mb-4">Location Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">IP Address:</span>
                  <p className="text-white font-mono">{ipLookupResult.ip}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Country:</span>
                  <p className="text-white">{ipLookupResult.country} ({ipLookupResult.countryCode})</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Region:</span>
                  <p className="text-white">{ipLookupResult.region}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">City:</span>
                  <p className="text-white">{ipLookupResult.city}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">ISP:</span>
                  <p className="text-white">{ipLookupResult.isp}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Organization:</span>
                  <p className="text-white">{ipLookupResult.organization}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Coordinates:</span>
                  <p className="text-white">{ipLookupResult.latitude}, {ipLookupResult.longitude}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Timezone:</span>
                  <p className="text-white">{ipLookupResult.timezone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderISPTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Wifi className="w-5 h-5 text-teal-400" />
          <span>What is My ISP</span>
        </h3>
        <p className="text-gray-300 mb-6">
          Discover information about your Internet Service Provider (ISP) including your public IP address and connection details.
        </p>
        
        <button
          onClick={handleISPLookup}
          disabled={loading}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 mb-6"
        >
          <Activity className="w-4 h-4" />
          <span>{loading ? 'Detecting...' : 'Detect My ISP'}</span>
        </button>

        {ispResult && (
          <div className="bg-black bg-opacity-30 rounded-lg p-6 animate-slide-up">
            <h4 className="text-lg font-semibold text-white mb-4">Your ISP Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Your IP Address:</span>
                  <p className="text-white font-mono">{ispResult.ip}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">ISP:</span>
                  <p className="text-white">{ispResult.isp}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Organization:</span>
                  <p className="text-white">{ispResult.organization}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Connection Type:</span>
                  <p className="text-white">{ispResult.connectionType}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Country:</span>
                  <p className="text-white">{ispResult.country}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Region:</span>
                  <p className="text-white">{ispResult.region}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">City:</span>
                  <p className="text-white">{ispResult.city}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">ASN:</span>
                  <p className="text-white">{ispResult.asn}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderIPv6Tab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <ArrowRightLeft className="w-5 h-5 text-purple-400" />
          <span>IPv6 to IPv4 Converter</span>
        </h3>
        <p className="text-gray-300 mb-6">
          Convert IPv6 addresses to their equivalent IPv4 format. Enter a valid IPv6 address to get its IPv4 equivalent.
        </p>
        
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={ipv6Input}
            onChange={(e) => setIpv6Input(e.target.value)}
            placeholder="Enter IPv6 address (e.g., 2001:db8::1)"
            className="flex-1 px-4 py-3 bg-black bg-opacity-50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleIPv6Conversion}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{loading ? 'Converting...' : 'Convert'}</span>
          </button>
        </div>

        {ipv6Result && (
          <div className="bg-black bg-opacity-30 rounded-lg p-6 animate-slide-up">
            <h4 className="text-lg font-semibold text-white mb-4">Conversion Result</h4>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm">IPv6 Address:</span>
                <p className="text-white font-mono text-lg">{ipv6Result.ipv6}</p>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowRightLeft className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Converts to</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">IPv4 Address:</span>
                <p className="text-white font-mono text-lg">{ipv6Result.ipv4}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Conversion Type:</span>
                <p className="text-white">{ipv6Result.conversionType}</p>
              </div>
              {ipv6Result.notes && (
                <div>
                  <span className="text-gray-400 text-sm">Notes:</span>
                  <p className="text-gray-300 text-sm">{ipv6Result.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ip-lookup': return renderIPLookupTab();
      case 'my-isp': return renderISPTab();
      case 'ipv6-converter': return renderIPv6Tab();
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">IP Address Tools</h2>
        <p className="text-gray-300">Comprehensive IP address analysis and conversion utilities</p>
      </div>

      <div className="mb-6">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gray-800 bg-opacity-70 text-white shadow-lg border border-gray-600'
                    : 'bg-gray-900 bg-opacity-30 text-gray-300 hover:bg-opacity-50 border border-gray-700 hover:border-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {loading && (
        <div className="py-8">
          <LoadingSpinner size="md" text="Processing..." />
        </div>
      )}

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <div className="min-h-96">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default IPTools;