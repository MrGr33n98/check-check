import React from 'react';

interface CardListProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}

export const CardList: React.FC<CardListProps> = ({ data, renderItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};