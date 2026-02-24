import { FooterBrand } from './features/FooterBrand';
import { FooterBottom } from './features/FooterBottom';
import { FooterNav } from './features/FooterNav';
import type { TCollections } from '@/types';

interface IProps {
  collections: TCollections;
}

export function Footer({ collections }: IProps) {
  return (
    <footer className="flex flex-col gap-6 bg-white p-6">
      {/* Основной блок */}
      <div className="flex flex-col gap-12 md:flex-row">
        <FooterBrand />
        <FooterNav collections={collections} />
      </div>

      {/* Нижняя полоса */}
      <FooterBottom />
    </footer>
  );
}
