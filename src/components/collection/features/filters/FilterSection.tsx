import type { ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

export function FilterSection({ title, children }: IProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 uppercase">{title}</h3>
      {children}
    </div>
  );
}
