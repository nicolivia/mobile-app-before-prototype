import React from 'react';

const ImageComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img src="/images/flag.png" alt="Description of image" className="w-auto h-auto" />
      <span className="text-lg">EN</span>
    </div>
  );
};

export default ImageComponent;