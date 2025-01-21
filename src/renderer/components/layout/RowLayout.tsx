import React from 'react';
import { twMerge } from 'tailwind-merge';

const RowLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        'w-full h-full flex flex-col gap-6 py-8 px-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

const isIncludesWidthClass = (className: string | undefined) => {
  return className
    ? /\bh-(\d{1,3}(\/[1-9]|\/1[0-2]|\/[2-9]\/1[0-2])?|px|auto|full)\b/.test(
        className || '',
      )
    : false;
};

const Row = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // 判斷 className 是否有指定寬度，若無則預設 flex-1
  const isWidthSpecified = isIncludesWidthClass(className);

  return (
    <div
      className={twMerge(
        'w-full h-full flex flex-col items-center gap-4 bg-slate-300 p-4',
        isWidthSpecified ? '' : 'flex-1', // 如果無寬度則使用 flex-1
        className,
      )}
    >
      {children}
    </div>
  );
};

RowLayout.Row = Row;

export default RowLayout;
