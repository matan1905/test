export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
};

export const getRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F67280', '#C06C84'];
  return colors[Math.floor(Math.random() * colors.length)];
};