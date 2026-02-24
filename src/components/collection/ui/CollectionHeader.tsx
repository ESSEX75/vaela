import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Title } from '@/components/ui';

interface IProps {
  title: string;
  breadcrumbs: { label: string; href: string }[];
  locale: string;
}

export function CollectionHeader({ title, breadcrumbs, locale }: IProps) {
  return (
    <div className="flex flex-col gap-4 px-6 md:flex-row md:items-end md:justify-between">
      <Title as="h1" size="hero">
        {title}
      </Title>

      <Breadcrumbs
        items={breadcrumbs}
        locale={locale}
        className="text-gray-400"
      />
    </div>
  );
}
