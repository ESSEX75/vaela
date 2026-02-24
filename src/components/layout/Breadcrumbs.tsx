import { SITE_NAME } from '@/config/site';
import Link from 'next/link';
import { cn } from '@/utils';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
  locale?: string;
};

export function Breadcrumbs({ items, className, locale }: Props) {
  const breadcrumbItems = locale
    ? [
        { label: SITE_NAME, href: `/${locale}` },
        ...(items || []).filter(item => item.label !== SITE_NAME),
      ]
    : items;

  if (!breadcrumbItems || breadcrumbItems.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {index === breadcrumbItems.length - 1 ? (
              <span
                className="font-medium text-black uppercase"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 uppercase hover:text-black"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
