export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
};

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export const getRandomColor = (seed) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F67280', '#C06C84'];
  // using seed without hashCode
  const hash = Math.abs(hashCode(seed));
  return colors[hash % colors.length];
};