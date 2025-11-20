import React, { useCallback, useState } from 'react';

interface ImageUploadProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove the Data-URI prefix to get just the base64
      const base64 = result.split(',')[1];
      const mimeType = result.split(';')[0].split(':')[1];
      onImageSelected(base64, mimeType);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4">
      <div className="max-w-md w-full text-center space-y-8">
        
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight text-slate-800">礦物辨識</h1>
          <p className="text-slate-500 text-sm">上傳照片或拍照，AI 將為您揭開礦物的秘密</p>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            relative group cursor-pointer
            border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ease-in-out
            ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
          `}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileInput}
            accept="image/*"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-full shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-slate-700">點擊上傳 或 拖放圖片</p>
              <p className="text-xs text-slate-400">支援 JPG, PNG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
