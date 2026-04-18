import React from 'react';

const OrnamentDivider = () => {
  return (
    <div className="relative w-full my-12 z-0">
      {/* Используем наш анимированный CSS-класс */}
      <div className="kg-ornament-flow shadow-lg">
        {/* Дополнительное золотое свечение в центре */}
        <div className="absolute inset-0 bg-kg-gold/5 blur-[80px]"></div>
      </div>
    </div>
  );
};

export default OrnamentDivider;