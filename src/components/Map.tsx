import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LANDMARKS, getSpeciesEmoji } from '../data/birds';

interface MapProps {
  onMapClick: (lng: number, lat: number) => void;
  sightings: any[];
  onMarkerClick: (sighting: any) => void;
}

const Map: React.FC<MapProps> = ({ onMapClick, sightings, onMarkerClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<{ [key: string]: maplibregl.Marker }>({});

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    // 使用 Maptiler 提供的地形风格底图，或者标准地形底图
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'carto-voyager': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        },
        layers: [
          {
            id: 'voyager-layer',
            type: 'raster',
            source: 'carto-voyager',
            minzoom: 0,
            maxzoom: 20
          }
        ]
      },
      center: [120.145, 30.245],
      zoom: 15, // 初始缩放更近一些
      pitch: 0, 
      bearing: 0
    });

    // 备用方案：如果 OpenTopoMap 加载慢，可以使用更加轻量、学术风格的底图
    // 这里我们保持这个风格，因为它更符合“国家地理”的地形感

    map.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // 添加地标
      LANDMARKS.forEach(landmark => {
        const el = document.createElement('div');
        el.className = 'landmark-label pointer-events-none';
        el.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="w-[1px] h-6 bg-ink-green/20 mb-1"></div>
            <span class="text-[11px] font-medium text-ink-green/60 tracking-[0.3em] whitespace-nowrap px-2 py-0.5 border-b border-ink-green/10">
              ${landmark.name}
            </span>
          </div>
        `;
        
        new maplibregl.Marker({ element: el })
          .setLngLat([landmark.lng, landmark.lat])
          .addTo(map.current!);
      });
    });

    map.current.on('click', (e) => {
      onMapClick(e.lngLat.lng, e.lngLat.lat);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // 清理旧标记
    Object.keys(markers.current).forEach(id => {
      if (!sightings.find(s => s.id === id)) {
        markers.current[id].remove();
        delete markers.current[id];
      }
    });

    // 更新观察点标记
    sightings.forEach(sighting => {
      if (!markers.current[sighting.id]) {
        const el = document.createElement('div');
        el.className = 'custom-marker group cursor-pointer';
        const emoji = getSpeciesEmoji(sighting.category, sighting.speciesName);
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-ink-green/5 rounded-full animate-pulse blur-lg"></div>
            <div class="text-4xl relative z-10 group-hover:scale-110 transition-transform drop-shadow-sm filter brightness-110">
              ${emoji}
            </div>
          </div>
        `;
        
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([sighting.lng, sighting.lat])
          .addTo(map.current!);
        
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onMarkerClick(sighting);
        });

        markers.current[sighting.id] = marker;
      }
    });
  }, [sightings, onMarkerClick]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={mapContainer} className="w-full h-full bg-[#E5E5E5]" />
      
      {/* 移除浮动标题装饰和坐标显示，保持地图纯净 */}
    </div>
  );
};

export default Map;
