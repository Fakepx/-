import React from 'react';

interface CustomerInfoProps {
  customerName: string;
  customerAddress: string;
  onCustomerNameChange: (name: string) => void;
  onCustomerAddressChange: (address: string) => void;
}

export default function CustomerInfo({
  customerName,
  customerAddress,
  onCustomerNameChange,
  onCustomerAddressChange
}: CustomerInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">客户名称</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">客户地址</label>
        <textarea
          value={customerAddress}
          onChange={(e) => onCustomerAddressChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}