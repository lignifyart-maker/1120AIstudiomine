
import React, { useMemo } from 'react';
import { MineralAnalysis } from '../types';

interface MineralResultProps {
  analysis: MineralAnalysis;
  imageSrc: string;
  onReset: () => void;
}

const MineralResult: React.FC<MineralResultProps> = ({ analysis, imageSrc, onReset }) => {
  
  const confidenceColor = useMemo(() => {
    if (analysis.confidenceLevel >= 80) return 'bg-green-500';
    if (analysis.confidenceLevel >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }, [analysis.confidenceLevel]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white pb-12 animate-fade-in">
      
      {/* Sticky Top Bar for reset on mobile, though button is also at bottom */}
      <div className="flex justify-end p-4">
        <button 
          onClick={onReset}
          className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          重新鑑定
        </button>
      </div>

      {/* Image Section - Max Width 600px as requested */}
      <div className="w-full flex justify-center mb-8">
        <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-100">
          <img 
            src={`data:image/jpeg;base64,${imageSrc}`} 
            alt={analysis.nameEnglish} 
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20 text-white">
            <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-bold tracking-wide">{analysis.nameChinese}</h2>
                <span className="text-lg font-light opacity-90">{analysis.nameEnglish}</span>
            </div>
            <p className="font-mono text-sm opacity-80 tracking-wider">{analysis.chemicalFormula}</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-10">
        
        {/* Confidence */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-500">鑑定信心度</span>
            <span className="text-2xl font-bold text-slate-800">{analysis.confidenceLevel}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full ${confidenceColor} transition-all duration-1000 ease-out`} 
              style={{ width: `${analysis.confidenceLevel}%` }}
            ></div>
          </div>
        </div>

        {/* Description */}
        <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 border-l-4 border-blue-500 pl-3">詳細介紹</h3>
            <p className="text-slate-600 leading-relaxed text-justify">
                {analysis.description}
            </p>
        </section>

        {/* Historical Stories */}
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
                歷史軼事
            </h3>
            <div className="space-y-4">
                {analysis.historicalStories.map((story, index) => (
                    <div key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5"></span>
                        <p className="text-slate-600 leading-relaxed text-justify italic">
                            {story}
                        </p>
                    </div>
                ))}
            </div>
        </section>

         {/* Social Media Topics */}
         <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-pink-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                社群熱門討論 (Threads/IG)
            </h3>
            <div className="grid gap-3">
                {analysis.socialMediaTopics.map((topic, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-700 text-sm flex items-start gap-3 hover:bg-slate-100 transition-colors">
                        <span className="text-pink-500 font-bold">#</span>
                        <span>{topic}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* Identification Reasoning */}
        <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-l-4 border-green-500 pl-3">鑑定特徵理由</h3>
            <ul className="grid gap-3">
                {analysis.identificationReasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold mt-0.5">
                            {index + 1}
                        </span>
                        <span className="leading-relaxed">{reason}</span>
                    </li>
                ))}
            </ul>
        </section>

        {/* Other Candidates */}
        <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-l-4 border-orange-500 pl-3">其他可能的礦物</h3>
            <div className="space-y-3">
                {analysis.otherCandidates.map((candidate, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="text-slate-700 font-medium">{candidate.name}</span>
                        <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                                <div 
                                    className="h-full bg-orange-400 rounded-full" 
                                    style={{ width: `${candidate.confidence}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-bold text-slate-500 w-10 text-right">{candidate.confidence}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* References */}
        <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 border-l-4 border-purple-500 pl-3">參考資料</h3>
            <div className="grid gap-4 sm:grid-cols-2">
                {analysis.references.map((ref, index) => (
                    <a 
                        key={index} 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group block p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-blue-700 group-hover:text-blue-800 truncate pr-2">{ref.title}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400 group-hover:text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">{ref.description}</p>
                    </a>
                ))}
            </div>
        </section>

        <div className="pt-8 flex justify-center">
            <button 
                onClick={onReset}
                className="px-8 py-3 bg-slate-800 text-white rounded-full hover:bg-black transition-colors shadow-lg font-medium tracking-wide flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                鑑定其他礦物
            </button>
        </div>
      </div>
    </div>
  );
};

export default MineralResult;
