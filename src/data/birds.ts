export interface Bird {
  id: string;
  name: string;
  latinName: string;
  description: string;
  image: string;
}

export const BIRDS: Bird[] = [
  {
    id: '1',
    name: '鸳鸯',
    latinName: 'Aix galericulata',
    description: '东亚特有种，常在西湖水域越冬，是西湖最著名的冬候鸟之一。',
    image: 'https://images.unsplash.com/photo-1594145070044-884693998782?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    name: '普通翠鸟',
    latinName: 'Alcedo atthis',
    description: '体型娇小，羽色艳丽，常在西湖岸边的芦苇丛或树枝上伺机捕鱼。',
    image: 'https://images.unsplash.com/photo-1610991959734-7227c9be9557?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    name: '白鹭',
    latinName: 'Egretta garzetta',
    description: '全身洁白，姿态优美，在杨公堤附近的湿地中非常常见。',
    image: 'https://images.unsplash.com/photo-1520623631249-166258957827?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    name: '苍鹭',
    latinName: 'Ardea cinerea',
    description: '大型涉禽，常孤独地伫立在湖边浅水处，如同一尊雕塑。',
    image: 'https://images.unsplash.com/photo-1550158461-10294521c85a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '5',
    name: '黑冠鳽',
    latinName: 'Gorsachius melanolophus',
    description: '稀有的林栖候鸟，偶尔在西湖南侧的山林中被观察到。',
    image: 'https://images.unsplash.com/photo-1621535499291-7f9754f76269?auto=format&fit=crop&q=80&w=600',
  },
];

export const LANDMARKS = [
  { name: '苏堤春晓', lng: 120.1415, lat: 30.2482 },
  { name: '雷峰夕照', lng: 120.1488, lat: 30.2341 },
  { name: '三潭印月', lng: 120.1447, lat: 30.2415 },
  { name: '断桥残雪', lng: 120.1501, lat: 30.2608 },
  { name: '杨公堤', lng: 120.1332, lat: 30.2488 },
];

export const getSpeciesEmoji = (category: 'animal' | 'plant', name: string) => {
  const n = name.toLowerCase();
  if (category === 'animal') {
    if (n.includes('乌鸫')) return '🐦‍⬛';
    if (n.includes('鸭') || n.includes('鸳鸯')) return '🦆';
    if (n.includes('鹅') || n.includes('天鹅')) return '🦢';
    if (n.includes('鹭') || n.includes('鸽')) return '🕊️';
    if (n.includes('鹰') || n.includes('雕')) return '🦅';
    if (n.includes('鸮') || n.includes('猫头鹰')) return '🦉';
    if (n.includes('鹦鹉')) return '🦜';
    return '🐦'; // 默认蓝色小鸟
  } else {
    if (n.includes('荷') || n.includes('莲')) return '🪷';
    if (n.includes('树') || n.includes('松') || n.includes('柏')) return '🌳';
    if (n.includes('花') || n.includes('樱') || n.includes('桃')) return '🌸';
    if (n.includes('草') || n.includes('苔')) return '🌱';
    if (n.includes('枫')) return '🍁';
    if (n.includes('竹')) return '🎋';
    return '🌿'; // 默认绿叶
  }
};
