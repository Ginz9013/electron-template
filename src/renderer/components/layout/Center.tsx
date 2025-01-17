import React from 'react';

type CenterLayoutProps = {
  children?: React.ReactNode;
};

const CenterLayout: React.FC<CenterLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex felx-col justify-center items-center">
      {children}
    </div>
  );
};

export default CenterLayout;
