import React from 'react';
import Image from 'next/image';

const LanguageOption: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full gap-2">
      <Image src="/images/flag-en.png" alt="Description of image" width={17} height={17} />
      <span className="text-lg">EN</span>
    </div>
  );
};

export default LanguageOption;