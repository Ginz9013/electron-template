import React from 'react';

const CenterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex felx-col justify-center items-center">
      {children}
    </div>
  );
};

const CenterContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col items-center gap-4">{children}</div>;
};

CenterLayout.CenterContainer = CenterContainer;

export default CenterLayout;
