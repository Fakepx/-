import React from 'react';
import { Quotation } from '../../types/quotation';

interface QuotationHeaderProps {
  date: string;
  number: string;
  onDateChange: (date: string) => void;
  onNumberChange: (number: string) => void;
}

export default function QuotationHeader({ date, number, onDateChange, onNumberChange }: QuotationHeaderProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">报价单号</label>
        <input
          type="text"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}