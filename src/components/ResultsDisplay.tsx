import React, { useState } from 'react';
import { 
  Globe, 
  Wifi, 
  CheckCircle,
  Download,
  Clock,
  MapPin
} from 'lucide-react';
import ChartComponent from './ChartComponent';
import DataTable from './DataTable';
import NetworkGraph from './NetworkGraph';

interface ResultsDisplayProps {
  results: {
    dns?: any;
    connectivity?: any;
    routing?: any;
    dnsCheck?: any;
  };
  domain: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, domain }) => {
  const [activeTab, setActiveTab] = useState('dns');

  const tabs = [
    { id: 'dns', label: 'DNS Analysis', icon: Globe },
    { id: 'connectivity', label: 'Connectivity', icon: Wifi },
    { id: 'dns-check', label: 'DNS Check', icon: CheckCircle }
  ];

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${domain}-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderDNSTab = () => {
    const { dns } = results;
    if (!dns) return <div className="text-center py-8 text-gray-500">No DNS data available</div>;

    const recordColumns = [
      { key: 'type', label: 'Type' },
      { key: 'name', label: 'Name' },
      { key: 'value', label: 'Value' },
      { key: 'ttl', label: 'TTL', render: (value: number) => `${value}s` }
    ];

    return (
      <div className="space-y-6">
        <ChartComponent
          data={dns.responseTimes?.map((item: any, index: number) => ({
            ...item,
            index: index + 1
          })) || []}
          type="line"
          title="DNS Response Times"
          xKey="index"
          yKey="time"
          color="#3B82F6"
        />
        
        <DataTable
          data={dns.records || []}
          columns={recordColumns}
          title="DNS Records"
        />

        {dns.authoritative && dns.authoritative.length > 0 && (
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Authoritative Servers</h3>
            <div className="flex flex-wrap gap-2">
              {dns.authoritative.map((server: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 bg-opacity-50 text-blue-800 rounded-full text-sm"
                >
                  {server}
                </span>
              ))}
            </div>
          </div>
        )}

        {dns.whois && (
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">WHOIS Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Registrar:</span>
                <p className="text-gray-900">{dns.whois.registrar}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Status:</span>
                <p className="text-gray-900">{dns.whois.status}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Created:</span>
                <p className="text-gray-900">{dns.whois.creationDate}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Expires:</span>
                <p className="text-gray-900">{dns.whois.expirationDate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderConnectivityTab = () => {
    const { connectivity } = results;
    if (!connectivity) return <div className="text-center py-8 text-gray-500">No connectivity data available</div>;

    return (
      <div className="space-y-6">
        {connectivity.pingTimes && connectivity.pingTimes.length > 0 && (
          <ChartComponent
            data={connectivity.pingTimes}
            type="line"
            title="Ping Response Times"
            xKey="packet"
            yKey="time"
            color="#14B8A6"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connectivity.ping && (
            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span>Ping Statistics</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Min:</span>
                  <span className="font-medium">{connectivity.ping.min?.toFixed(2)} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">{connectivity.ping.avg?.toFixed(2)} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max:</span>
                  <span className="font-medium">{connectivity.ping.max?.toFixed(2)} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Packet Loss:</span>
                  <span className="font-medium">{connectivity.ping.packetLoss}%</span>
                </div>
              </div>
            </div>
          )}

          {connectivity.http && (
            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>HTTP Status</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${connectivity.http.status === 200 ? 'text-green-600' : 'text-red-600'}`}>
                    {connectivity.http.status} {connectivity.http.statusText}
                  </span>
                </div>
                {connectivity.http.responseTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="font-medium">{connectivity.http.responseTime.toFixed(2)} ms</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {connectivity.telnet && (
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Port Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(connectivity.telnet).map(([port, status]) => (
                <div key={port} className="text-center p-3 bg-black bg-opacity-30 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">{port.replace('port', 'Port ')}</p>
                  <p className={`font-semibold ${
                    status === 'Open' ? 'text-green-600' : 
                    status === 'Filtered' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDNSCheckTab = () => {
    const { dnsCheck } = results;
    if (!dnsCheck) return <div className="text-center py-8 text-gray-400">No DNS check data available</div>;

    const resolverColumns = [
      { key: 'name', label: 'Resolver' },
      { key: 'ip', label: 'IP Address' },
      { key: 'records', label: 'Records', render: (value: string[]) => (
        <div className="space-y-1">
          {value.map((record, index) => (
            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
              {record}
            </div>
          ))}
        </div>
      )},
      { key: 'responseTime', label: 'Response Time', render: (value: number) => `${value.toFixed(2)} ms` }
    ];

    return (
      <div className="space-y-6">
        <ChartComponent
          data={dnsCheck.resolvers?.map((resolver: any) => ({
            name: resolver.name,
            responseTime: resolver.responseTime,
            records: resolver.records.length
          })) || []}
          type="bar"
          title="DNS Resolver Response Times"
          xKey="name"
          yKey="responseTime"
          color="#14B8A6"
        />
        
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">DNS Consistency Check</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-900 bg-opacity-30 rounded-lg">
              <p className="text-sm font-medium text-blue-300">Consistent</p>
              <p className={`text-xl font-bold ${dnsCheck.consistency.consistent ? 'text-green-600' : 'text-red-600'}`}>
                {dnsCheck.consistency.consistent ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-800 bg-opacity-30 rounded-lg">
              <p className="text-sm font-medium text-gray-300">Total Resolvers</p>
              <p className="text-xl font-bold text-white">{dnsCheck.consistency.totalResolvers}</p>
            </div>
            <div className="text-center p-3 bg-green-900 bg-opacity-30 rounded-lg">
              <p className="text-sm font-medium text-green-300">Responding</p>
              <p className="text-xl font-bold text-green-400">{dnsCheck.consistency.respondingResolvers}</p>
            </div>
            <div className="text-center p-3 bg-purple-900 bg-opacity-30 rounded-lg">
              <p className="text-sm font-medium text-purple-300">Unique Records</p>
              <p className="text-xl font-bold text-purple-400">{dnsCheck.consistency.uniqueRecords.length}</p>
            </div>
          </div>
          
          {dnsCheck.consistency.uniqueRecords.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Unique IP Addresses:</h4>
              <div className="flex flex-wrap gap-2">
                {dnsCheck.consistency.uniqueRecords.map((record: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-blue-900 bg-opacity-50 text-blue-300 rounded text-sm font-mono">
                    {record}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <DataTable
          data={dnsCheck.resolvers || []}
          columns={resolverColumns}
          title="DNS Resolver Responses"
        />
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dns': return renderDNSTab();
      case 'connectivity': return renderConnectivityTab();
      case 'dns-check': return renderDNSCheckTab();
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
          <p className="text-gray-300">Domain: <span className="font-mono font-medium text-blue-400">{domain}</span></p>
        </div>
        <button
          onClick={exportResults}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="w-4 h-4" />
          <span>Export Results</span>
        </button>
      </div>

      <div className="mb-6">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-900 bg-opacity-50 text-gray-300 hover:bg-opacity-70 backdrop-blur-md border border-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="min-h-96">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ResultsDisplay;