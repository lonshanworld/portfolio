import React, { useState } from 'react';
import ModernView from './components/ModernView';
import RetroView from './components/RetroView';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('modern');

  return (
    <div className="relative">
      {/* Sticky Text Switch - Top Right & Compact */}
      <div className="fixed top-4 right-4 z-50 flex items-center bg-black/90 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-2xl scale-90 origin-top-right">
        <button 
          onClick={() => setViewMode('modern')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
            viewMode === 'modern' 
              ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.6)]' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          &lt; Modern /&gt;
        </button>
        <button 
          onClick={() => setViewMode('retro')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold font-serif transition-all duration-300 ${
            viewMode === 'retro' 
              ? 'bg-gray-300 text-black shadow-[2px_2px_0px_#fff]' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          &lt; Retro /&gt;
        </button>
      </div>

      {/* Render Active View */}
      {viewMode === 'modern' ? <ModernView /> : <RetroView />}
    </div>
  );
};

export default App;