import React, { useState } from 'react';
import { Quotation, QuotationItem } from '../../types/quotation';
import QuotationHeader from './QuotationHeader';
import CustomerInfo from './CustomerInfo';
import QuotationItems from './QuotationItems';

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
      <QuotationHeader
        date={quotation.date}
        number={quotation.number}
        onDateChange={(date) => setQuotation({ ...quotation, date })}
        onNumberChange={(number) => setQuotation({ ...quotation, number })}
      />

      <CustomerInfo
        customerName={quotation.customerName}
        customerAddress={quotation.customerAddress}
        onCustomerNameChange={(customerName) => setQuotation({ ...quotation, customerName })}
        onCustomerAddressChange={(customerAddress) => setQuotation({ ...quotation, customerAddress })}
      />

      <QuotationItems
        items={quotation.items}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onUpdateItem={updateItem}
      />

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