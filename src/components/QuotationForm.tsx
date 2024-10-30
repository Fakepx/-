import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Quotation, QuotationItem } from '../types/quotation';

interface QuotationFormProps {
  onSubmit: (quotation: Quotation) => void;
  initialData?: Quotation;
}

export default function QuotationForm({ onSubmit, initialData }: QuotationFormProps) {
  const [quotation, setQuotation] = useState<Quotation>(
    initialData || {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      number: `QT-${Date.now()}`,
      customerName: '',
      customerAddress: '',
      items: [],
      total: 0,
      notes: ''
    }
  );

  const addItem = () => {
    const newItem: QuotationItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0
    };
    setQuotation({
      ...quotation,
      items: [...quotation.items, newItem]
    });
  };

  const removeItem = (id: string) => {
    setQuotation({
      ...quotation,
      items: quotation.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: any) => {
    setQuotation({
      ...quotation,
      items: quotation.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
          return updatedItem;
        }
        return item;
      })
    });
  };

  const calculateTotal = () => {
    const total = quotation.items.reduce((sum, item) => sum + item.amount, 0);
    setQuotation({ ...quotation, total });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTotal();
    onSubmit(quotation);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">日期</label>
          <input
            type="date"
            value={quotation.date}
            onChange={(e) => setQuotation({ ...quotation, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">报价单号</label>
          <input
            type="text"
            value={quotation.number}
            onChange={(e) => setQuotation({ ...quotation, number: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">客户名称</label>
          <input
            type="text"
            value={quotation.customerName}
            onChange={(e) => setQuotation({ ...quotation, customerName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">客户地址</label>
          <textarea
            value={quotation.customerAddress}
            onChange={(e) => setQuotation({ ...quotation, customerAddress: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">项目明细</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            添加项目
          </button>
        </div>

        <div className="space-y-4">
          {quotation.items.map((item) => (
            <div key={item.id} className="flex gap-4 items-start">
              <div className="flex-grow">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  placeholder="描述"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                  placeholder="数量"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
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
                onClick={() => removeItem(item.id)}
                className="mt-1 p-2 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">备注</label>
        <textarea
          value={quotation.notes}
          onChange={(e) => setQuotation({ ...quotation, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          保存报价单
        </button>
      </div>
    </form>
  );
}