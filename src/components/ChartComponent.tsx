import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartComponentProps {
  data: any[];
  type: 'bar' | 'line';
  title: string;
  xKey: string;
  yKey: string;
  color?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ 
  data, 
  type, 
  title, 
  xKey, 
  yKey, 
  color = '#3B82F6' 
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700 animate-fade-in">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey={xKey} 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  backdropFilter: 'blur(4px)',
                  color: '#F9FAFB'
                }}
              />
              <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey={xKey} 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  backdropFilter: 'blur(4px)',
                  color: '#F9FAFB'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={yKey} 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;