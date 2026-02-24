import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE, LOCALE_CODES } from './src/config/locales';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !LOCALE_CODES.includes(locale as any)) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: {
      common: (await import(`./src/messages/${locale}/common.json`)).default,
      header: (await import(`./src/messages/${locale}/header.json`)).default,
      footer: (await import(`./src/messages/${locale}/footer.json`)).default,
      home: (await import(`./src/messages/${locale}/home.json`)).default,
      wishlist: (await import(`./src/messages/${locale}/wishlist.json`))
        .default,
      collaboration: (
        await import(`./src/messages/${locale}/collaboration.json`)
      ).default,
      auth: (await import(`./src/messages/${locale}/auth.json`)).default,
      cart: (await import(`./src/messages/${locale}/cart.json`)).default,
      checkout: (await import(`./src/messages/${locale}/checkout.json`))
        .default,
      product: (await import(`./src/messages/${locale}/product.json`)).default,
      system: (await import(`./src/messages/${locale}/system.json`)).default,
    },
  };
});
