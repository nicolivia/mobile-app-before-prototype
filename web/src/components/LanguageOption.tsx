import React from 'react';

const LanguageOption: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full gap-2">
      <img src="/images/flag-en.png" alt="Description of image" className="w-6 h-6" />
      <span className="text-lg">EN</span>
    </div>
  );
};

export default LanguageOption;