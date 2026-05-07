import React, { useState, useCallback } from 'react';
import Map from './components/Map';
import SightingForm from './components/SightingForm';
import BirdCard from './components/BirdCard';
import { List, X } from 'lucide-react';
import { format } from 'date-fns';

interface Sighting {
  id: string;
  category: 'animal' | 'plant';
  speciesName: string;
  lng: number;
  lat: number;
  time: Date;
  image?: string;
}

import { useEffect } from 'react';

const App: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [pendingSighting, setPendingSighting] = useState<{ lng: number, lat: number } | null>(null);
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('west_lake_sightings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert string dates back to Date objects
      const formatted = parsed.map((s: any) => ({
        ...s,
        time: new Date(s.time)
      }));
      setSightings(formatted);
    }
  }, []);

  // Save to local storage whenever sightings change
  useEffect(() => {
    localStorage.setItem('west_lake_sightings', JSON.stringify(sightings));
  }, [sightings]);

  const handleMapClick = useCallback((lng: number, lat: number) => {
    setPendingSighting({ lng, lat });
  }, []);

  const handleSaveSighting = (data: { category: 'animal' | 'plant', speciesName: string, image?: string, time: Date }) => {
    if (!pendingSighting) return;
    
    const newSighting: Sighting = {
      id: Math.random().toString(36).substr(2, 9),
      category: data.category,
      speciesName: data.speciesName,
      lng: pendingSighting.lng,
      lat: pendingSighting.lat,
      time: data.time,
      image: data.image,
    };

    setSightings(prev => [newSighting, ...prev]);
    setPendingSighting(null);
  };

  const handleDeleteSighting = (id: string) => {
    setSightings(prev => prev.filter(s => s.id !== id));
    setSelectedSighting(null);
  };

  const handleMarkerClick = useCallback((sighting: Sighting) => {
    setSelectedSighting(sighting);
  }, []);

  return (
    <div className="relative h-screen w-full bg-mist-grey overflow-hidden selection:bg-ink-green selection:text-white">
      {/* 核心地图 */}
      <Map 
        onMapClick={handleMapClick} 
        sightings={sightings}
        onMarkerClick={handleMarkerClick}
      />

      {/* 浮动历史记录按钮 */}
      <button 
        onClick={() => setShowHistory(!showHistory)}
        className="fixed top-10 right-10 z-30 bg-white/90 backdrop-blur-md border border-ink-green/10 p-4 shadow-xl hover:bg-white transition-all group"
      >
        {showHistory ? <X size={20} className="text-ink-green" /> : <List size={20} className="text-ink-green" />}
      </button>

      {/* 历史记录侧滑 (浮动) */}
      <div className={`fixed inset-y-0 right-0 z-20 w-80 bg-white/95 backdrop-blur-xl border-l border-ink-green/5 shadow-2xl transform transition-transform duration-700 ease-in-out ${showHistory ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-10">
          <div className="mb-10 pt-10">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink-green/30 mb-2">Observation Log</h3>
            <h2 className="text-2xl font-playfair font-bold text-ink-green">最近观测记录</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-4 space-y-8">
            {sightings.length === 0 ? (
              <p className="text-sm font-serif italic text-ink-green/30">尚无记录。请在地图上点击记录您的第一次发现。</p>
            ) : (
              sightings.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => {
                    setSelectedSighting(s);
                    setShowHistory(false);
                  }}
                  className="group cursor-pointer border-b border-ink-green/5 pb-6 hover:border-ink-green/20 transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-bold text-earth-brown uppercase tracking-tighter">{s.category === 'animal' ? '动物' : '植物'}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-ink-green/30">{format(s.time, 'MM-dd HH:mm')}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSighting(s.id);
                        }}
                        className="text-red-900/20 hover:text-red-900/60 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-lg font-playfair font-bold text-ink-green group-hover:translate-x-1 transition-transform">{s.speciesName}</h4>
                  <p className="text-[10px] text-earth-brown/60 mt-1 italic">{s.lat.toFixed(3)}, {s.lng.toFixed(3)}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-ink-green/5">
            <p className="text-[10px] text-ink-green/20 leading-relaxed italic">
              "自然是一本永远读不完的书。"
            </p>
          </div>
        </div>
      </div>

      {/* 弹窗组件 */}
      {pendingSighting && (
        <SightingForm 
          lng={pendingSighting.lng}
          lat={pendingSighting.lat}
          onSave={handleSaveSighting}
          onCancel={() => setPendingSighting(null)}
        />
      )}

      {selectedSighting && (
        <BirdCard 
          sighting={selectedSighting}
          onClose={() => setSelectedSighting(null)}
          onDelete={() => handleDeleteSighting(selectedSighting.id)}
        />
      )}

      {/* 移除初始引导文字，使页面完全清爽 */}
    </div>
  );
};

export default App;
