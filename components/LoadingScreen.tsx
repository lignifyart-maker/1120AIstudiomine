import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 animate-fade-in">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
        </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-medium text-slate-800">正在鑑定中...</h3>
        <p className="text-slate-500 text-sm">AI 正在分析晶體結構與光澤特徵</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
