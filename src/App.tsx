import React, { useState } from 'react';
import QuotationForm from './components/QuotationForm';
import QuotationPreview from './components/QuotationPreview';
import { Quotation } from './types/quotation';

function App() {
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (newQuotation: Quotation) => {
    setQuotation(newQuotation);
    setIsPreview(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">报价单系统</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isPreview && quotation ? (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setIsPreview(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                返回编辑
              </button>
            </div>
            <QuotationPreview quotation={quotation} />
          </div>
        ) : (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <QuotationForm onSubmit={handleSubmit} initialData={quotation || undefined} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;