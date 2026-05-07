import React, { useState } from 'react';
import { X, Camera, Clock, Leaf, Bug } from 'lucide-react';

interface SightingFormProps {
  lng: number;
  lat: number;
  onSave: (data: { category: 'animal' | 'plant', speciesName: string, image?: string, time: Date }) => void;
  onCancel: () => void;
}

const SightingForm: React.FC<SightingFormProps> = ({ onSave, onCancel }) => {
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16));
  const [category, setCategory] = useState<'animal' | 'plant'>('animal');
  const [speciesName, setSpeciesName] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speciesName) return;
    onSave({
      category,
      speciesName,
      image,
      time: new Date(time),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-sm shadow-2xl border border-ink-green/5 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-ink-green/5 flex justify-between items-center bg-mist-grey/20">
          <div>
            <h2 className="text-xl font-playfair font-bold text-ink-green">新的观察</h2>
            <p className="text-[10px] text-ink-green/40 uppercase tracking-widest font-bold">Scientific Observation</p>
          </div>
          <button onClick={onCancel} className="text-ink-green/40 hover:text-ink-green">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Step 1: Time */}
          <div className="space-y-2">
            <label className="flex items-center text-[10px] uppercase tracking-widest font-bold text-ink-green/40">
              <Clock size={12} className="mr-2" /> 观测时间
            </label>
            <input 
              type="datetime-local" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-mist-grey/50 border border-ink-green/10 p-3 text-sm font-serif outline-none focus:border-ink-green/40"
            />
          </div>

          {/* Step 2: Category */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-ink-green/40">类别</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCategory('animal')}
                className={`flex-1 flex flex-col items-center p-4 border transition-all ${category === 'animal' ? 'bg-ink-green text-white border-ink-green shadow-lg' : 'bg-white border-ink-green/10 text-ink-green/40'}`}
              >
                <Bug size={24} className="mb-1" />
                <span className="text-xs font-bold">动物</span>
              </button>
              <button
                type="button"
                onClick={() => setCategory('plant')}
                className={`flex-1 flex flex-col items-center p-4 border transition-all ${category === 'plant' ? 'bg-ink-green text-white border-ink-green shadow-lg' : 'bg-white border-ink-green/10 text-ink-green/40'}`}
              >
                <Leaf size={24} className="mb-1" />
                <span className="text-xs font-bold">植物</span>
              </button>
            </div>
          </div>

          {/* Step 3: Species Name */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-ink-green/40">物种名称</label>
            <input 
              type="text" 
              placeholder="例如：乌鸫、香樟树..."
              value={speciesName}
              onChange={(e) => setSpeciesName(e.target.value)}
              className="w-full bg-mist-grey/50 border border-ink-green/10 p-3 text-sm font-serif outline-none focus:border-ink-green/40"
              required
            />
          </div>

          {/* Step 4: Optional Photo */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-ink-green/40">照片 (可选)</label>
            <div className="relative aspect-video bg-mist-grey/50 border border-dashed border-ink-green/20 flex flex-col items-center justify-center text-ink-green/40 group hover:border-ink-green/40 transition-colors cursor-pointer overflow-hidden">
              {image ? (
                <img src={image} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
              ) : (
                <>
                  <Camera size={20} className="mb-1" />
                  <span className="text-[10px] italic">点击添加现场照片</span>
                </>
              )}
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleImageChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-ink-green text-white py-4 font-bold tracking-[0.4em] uppercase text-xs hover:bg-black transition-all shadow-xl"
          >
            归档观测
          </button>
        </form>
      </div>
    </div>
  );
};

export default SightingForm;
