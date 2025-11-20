import React, { useCallback, useState, useRef } from 'react';

interface ImageUploadProps {
  onImageSelected: (base64: string, mimeType: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('請上傳圖片檔案 (JPG, PNG)');
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
    // Clear the value so the same file can be selected again if needed
    e.target.value = '';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-8">
      <div className="max-w-md w-full text-center space-y-10">
        
        <div className="space-y-3">
          <h1 className="text-3xl font-light tracking-tight text-slate-800">礦物辨識</h1>
          <p className="text-slate-500 text-sm">使用相機拍攝或上傳照片，AI 將為您揭開礦物的秘密</p>
        </div>

        {/* Mobile-Optimized Actions */}
        <div className="grid grid-cols-1 gap-4 w-full px-2">
          
          {/* Primary Action: Camera */}
          <button 
            onClick={() => cameraInputRef.current?.click()}
            className="group relative w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-5 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-4 transition-all transform active:scale-[0.98]"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 0 0-9 0 4.5 4.5 0 0 0 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
            <span className="text-xl font-medium tracking-wide">拍攝照片</span>
          </button>

          {/* Secondary Action: Gallery */}
          <button 
            onClick={() => galleryInputRef.current?.click()}
            className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 p-4 rounded-2xl flex items-center justify-center gap-3 transition-colors active:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="text-base font-medium">從相簿選擇</span>
          </button>
        </div>

        {/* Desktop Drag & Drop Hint */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`
            hidden md:flex mt-8
            flex-col items-center justify-center
            border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50'}
          `}
          onClick={() => galleryInputRef.current?.click()}
        >
          <p className="text-xs">或將圖片拖放到這裡 (桌面版)</p>
        </div>

        {/* Hidden Inputs */}
        <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment" // Force rear camera on mobile
            className="hidden"
            onChange={handleFileInput}
        />
        <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
        />

      </div>
    </div>
  );
};

export default ImageUpload;