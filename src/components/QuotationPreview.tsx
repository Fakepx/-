import React from 'react';
import { format } from 'date-fns';
import { Quotation } from '../types/quotation';

interface QuotationPreviewProps {
  quotation: Quotation;
}

export default function QuotationPreview({ quotation }: QuotationPreviewProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">报价单</h1>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p><span className="font-semibold">客户名称：</span>{quotation.customerName}</p>
          <p><span className="font-semibold">客户地址：</span>{quotation.customerAddress}</p>
        </div>
        <div className="text-right">
          <p><span className="font-semibold">报价单号：</span>{quotation.number}</p>
          <p><span className="font-semibold">日期：</span>{format(new Date(quotation.date), 'yyyy-MM-dd')}</p>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 mb-8">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">单价</th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {quotation.items.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.unitPrice.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="px-6 py-4 text-right font-semibold">总计：</td>
            <td className="px-6 py-4 text-right font-semibold">{quotation.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      {quotation.notes && (
        <div className="mb-8">
          <h3 className="font-semibold mb-2">备注：</h3>
          <p className="text-gray-700">{quotation.notes}</p>
        </div>
      )}
    </div>
  );
}