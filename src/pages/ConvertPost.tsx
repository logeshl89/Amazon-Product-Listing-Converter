import React, { useState } from 'react';
import { Upload, X, Check, RefreshCw, AlertCircle, Camera, Type, Tag, DollarSign } from 'lucide-react';
import type { SocialPost } from '../types';

interface PreviewData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

export default function ConvertPost() {
  const [step, setStep] = useState<'upload' | 'preview' | 'processing'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    setError(null);
    
    // Simulate file processing
    setStep('processing');
    
    // Simulate API processing
    setTimeout(() => {
      setPreviewData({
        title: 'Smart Fitness Tracker Pro X1',
        description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, and personalized coaching. Features a vibrant OLED display and 7-day battery life.',
        price: '99.99',
        category: 'Electronics > Wearable Technology',
        images: [
          'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8',
          'https://images.unsplash.com/photo-1557438159-51eec7a6c9e9'
        ]
      });
      setStep('preview');
    }, 2000);
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files?.length) {
        handleDrop({ preventDefault: () => {} } as React.DragEvent<HTMLDivElement>);
      }
    };
    input.click();
  };

  const renderUploadStep = () => (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        dragActive ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Drop your social media post here</h3>
      <p className="text-gray-500 mb-6">or select files from your computer</p>
      <button
        onClick={handleFileSelect}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Select Files
      </button>
      {error && (
        <div className="mt-4 flex items-center justify-center text-red-500">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  const renderProcessingStep = () => (
    <div className="text-center py-12">
      <RefreshCw className="h-12 w-12 mx-auto text-purple-600 animate-spin mb-4" />
      <h3 className="text-xl font-semibold mb-2">Processing your content</h3>
      <p className="text-gray-500">This will just take a moment...</p>
    </div>
  );

  const renderPreviewStep = () => {
    if (!previewData) return null;

    return (
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-6">Preview Amazon Listing</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Camera className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <div className="flex space-x-4">
                  {previewData.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Product ${idx + 1}`}
                      className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Type className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                <input
                  type="text"
                  value={previewData.title}
                  onChange={(e) => setPreviewData({ ...previewData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Tag className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={previewData.category}
                  onChange={(e) => setPreviewData({ ...previewData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <DollarSign className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={previewData.price}
                  onChange={(e) => setPreviewData({ ...previewData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Type className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={previewData.description}
                  onChange={(e) => setPreviewData({ ...previewData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setStep('upload')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Start Over
            </button>
            <button
              onClick={() => {
                // Handle submission
                alert('Listing created successfully!');
                setStep('upload');
                setPreviewData(null);
              }}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Create Listing
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-semibold mb-8">Convert Social Media Post</h2>
        
        {step === 'upload' && renderUploadStep()}
        {step === 'processing' && renderProcessingStep()}
        {step === 'preview' && renderPreviewStep()}
      </div>
    </div>
  );
}