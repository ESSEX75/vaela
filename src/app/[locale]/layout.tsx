import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header/Header';
import { Footer } from '@/components/layout/footer/Footer';
import { Providers } from '@/providers/Providers';
import { SITE_NAME } from '@/config/site';
import { createRSCCaller } from '@/lib/trpc/server';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ModalContainer } from '@/components/layout/modal/ModalContainer';
import type { IBaseLayoutProps } from '@/types';
import '../../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} | Fullstack E-commerce`,
  },
  description: 'Modern E-commerce store built with Next.js',
  icons: {
    icon: '/assets/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: IBaseLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();
  const trpc = await createRSCCaller();
  const collections = await trpc.collection.all();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <Header collections={collections} />
            <CartDrawer />
            <ModalContainer />
            <main className="min-h-screen">{children}</main>
            <Footer collections={collections} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
