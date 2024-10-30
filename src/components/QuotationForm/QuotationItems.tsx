import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { QuotationItem } from '../../types/quotation';

interface QuotationItemsProps {
  items: QuotationItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof QuotationItem, value: any) => void;
}

export default function QuotationItems({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem
}: QuotationItemsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">项目明细</h3>
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          添加项目
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-start">
            <div className="flex-grow">
              <input
                type="text"
                value={item.description}
                onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                placeholder="描述"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-24">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
                placeholder="数量"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <input
                type="number"
                value={item.unitPrice}
                onChange={(e) => onUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                placeholder="单价"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="w-32">
              <input
                type="number"
                value={item.amount}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              className="mt-1 p-2 text-red-600 hover:text-red-800"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}