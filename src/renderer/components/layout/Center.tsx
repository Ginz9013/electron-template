import React from 'react';
import { twMerge } from 'tailwind-merge';

const CenterLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        'w-screen h-screen flex felx-col justify-center items-center',
        className,
      )}
    >
      {children}
    </div>
  );
};

const CenterContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge('flex flex-col items-center gap-4', className)}>
      {children}
    </div>
  );
};

CenterLayout.CenterContainer = CenterContainer;

export default CenterLayout;
