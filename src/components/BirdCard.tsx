import React from 'react';
import { X, MapPin, Clock, Info, Leaf, Bug } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface BirdCardProps {
  sighting: {
    id: string;
    category: 'animal' | 'plant';
    speciesName: string;
    lng: number;
    lat: number;
    time: Date;
    image?: string;
  };
  onClose: () => void;
  onDelete: () => void;
}

const BirdCard: React.FC<BirdCardProps> = ({ sighting, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FFFFF9] w-full max-w-lg shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-earth-brown/10 relative animate-in slide-in-from-bottom-8 duration-500 my-auto">
        {/* 顶部关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/50 backdrop-blur-md p-1 rounded-full text-ink-green/40 hover:text-ink-green transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col">
          {/* 照片区域：高度自适应 */}
          <div className="relative w-full bg-mist-grey min-h-[100px]">
            {sighting.image ? (
              <img 
                src={sighting.image} 
                alt={sighting.speciesName} 
                className="w-full h-auto block shadow-inner"
              />
            ) : (
              <div className="w-full aspect-video flex flex-col items-center justify-center text-ink-green/10 p-12 text-center">
                {sighting.category === 'animal' ? <Bug size={64} /> : <Leaf size={64} />}
                <p className="mt-4 text-[10px] uppercase tracking-widest font-bold">No Image Recorded</p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <span className="text-[9px] text-white font-bold uppercase tracking-widest bg-ink-green/80 backdrop-blur-sm px-2 py-0.5">
                {sighting.category === 'animal' ? '动物界' : '植物界'}
              </span>
            </div>
          </div>

          {/* 信息区域 */}
          <div className="p-8 md:p-10 flex flex-col relative">
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-[1px] w-6 bg-earth-brown/30"></span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-earth-brown/60 whitespace-nowrap">FIELD RECORD</span>
            </div>
            
            <h2 className="text-3xl font-playfair font-bold text-ink-green mb-6">{sighting.speciesName}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-ink-green/5 pt-6">
              <div className="flex items-start space-x-3">
                <MapPin size={12} className="mt-1 text-ink-green/30" />
                <div>
                  <label className="block text-[8px] uppercase tracking-widest font-bold text-ink-green/30 mb-0.5">地理位置</label>
                  <p className="text-xs font-serif italic text-earth-brown leading-tight">杭州 · 西湖<br/>({sighting.lat.toFixed(4)}, {sighting.lng.toFixed(4)})</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock size={12} className="mt-1 text-ink-green/30" />
                <div>
                  <label className="block text-[8px] uppercase tracking-widest font-bold text-ink-green/30 mb-0.5">观测时间</label>
                  <p className="text-xs font-serif leading-tight">{format(sighting.time, 'yyyy年MM月dd日', { locale: zhCN })}<br/>{format(sighting.time, 'HH:mm')}</p>
                </div>
              </div>
            </div>

            {/* 备注区域 */}
            <div className="mt-6 pt-4 border-t border-ink-green/5 flex items-start space-x-3">
              <Info size={12} className="mt-1 text-ink-green/30 flex-shrink-0" />
              <p className="text-[11px] leading-relaxed font-serif text-ink-green/60 italic">
                该观测数据已存入西湖自然档案系统。
              </p>
            </div>

            {/* 底部操作行 */}
            <div className="mt-10 pt-6 border-t border-ink-green/5 flex justify-between items-center space-x-4">
              <p className="text-[8px] text-ink-green/20 uppercase tracking-[0.2em] font-bold italic truncate flex-1">
                Archived by Citizen Scientist
              </p>
              <button 
                onClick={onDelete}
                className="text-[9px] uppercase tracking-widest font-bold text-red-900/40 hover:text-red-900 transition-colors border border-red-900/10 px-3 py-1 whitespace-nowrap"
              >
                撤销记录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdCard;
