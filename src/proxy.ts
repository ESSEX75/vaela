import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, LOCALE_CODES } from './config/locales';

export default createMiddleware({
  locales: LOCALE_CODES,
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
