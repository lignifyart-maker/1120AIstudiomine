import React, { useState, useEffect } from 'react';
import { Chat } from "@google/genai";
import { analyzeMineralImage, createMineralChat } from './services/geminiService';
import { AppState, MineralAnalysis } from './types';
import ImageUpload from './components/ImageUpload';
import MineralResult from './components/MineralResult';
import ChatInterface from './components/ChatInterface';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mineralData, setMineralData] = useState<MineralAnalysis | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  // Scroll to top when result is displayed
  useEffect(() => {
    if (appState === AppState.RESULT) {
      window.scrollTo(0, 0);
    }
  }, [appState]);

  const handleImageSelected = async (base64: string, mimeType: string) => {
    setImageBase64(base64);
    setAppState(AppState.ANALYZING);

    try {
      const data = await analyzeMineralImage(base64, mimeType);
      setMineralData(data);
      
      // Initialize chat with context immediately after analysis
      const chat = createMineralChat(data);
      setChatSession(chat);
      
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("鑑定失敗，請檢查網路連線或更換圖片再試一次。");
      setAppState(AppState.UPLOAD);
      setImageBase64(null);
    }
  };

  const handleReset = () => {
    setAppState(AppState.UPLOAD);
    setImageBase64(null);
    setMineralData(null);
    setChatSession(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main className="w-full mx-auto min-h-screen flex flex-col">
        
        {appState === AppState.UPLOAD && (
          <ImageUpload onImageSelected={handleImageSelected} />
        )}

        {appState === AppState.ANALYZING && (
          <div className="flex-grow flex items-center justify-center">
             <LoadingScreen />
          </div>
        )}

        {appState === AppState.RESULT && mineralData && imageBase64 && (
          <>
            <div className="flex-grow">
               <MineralResult 
                 analysis={mineralData} 
                 imageSrc={imageBase64} 
                 onReset={handleReset}
               />
            </div>
            <div className="w-full">
                <ChatInterface chatSession={chatSession} />
            </div>
          </>
        )}

      </main>
      
      {/* Footer / Copyright - Subtle */}
      <footer className="py-6 text-center text-xs text-slate-300">
         &copy; {new Date().getFullYear()} Mineral Lens AI. Powered by Gemini.
      </footer>
    </div>
  );
};

export default App;