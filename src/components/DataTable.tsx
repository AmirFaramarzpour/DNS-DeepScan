import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title?: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        <div className="flex items-center justify-center py-8 text-gray-400">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700 animate-fade-in">
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-600">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-800 hover:bg-opacity-30 transition-colors duration-200">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-gray-200">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;