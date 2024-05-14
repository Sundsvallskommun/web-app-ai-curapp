import { GuiProvider } from '@sk-web-gui/react';
import '@styles/tailwind.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import type { AppProps /*, AppContext */ } from 'next/app';
import { AppWrapper } from '../contexts/app.context';

dayjs.extend(utc);
dayjs.locale('sv');
dayjs.extend(updateLocale);
dayjs.updateLocale('sv', {
  months: [
    'Januari',
    'Februari',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Augusti',
    'September',
    'Oktober',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
});

import { extendTheme } from '@sk-web-gui/theme';

const mytheme = extendTheme({
  colorSchemes: {
    light: {
      colors: {
        brand: process.env.NEXT_PUBLIC_BRAND_COLOR,
      },
    },
    dark: {
      colors: {
        brand: process.env.NEXT_PUBLIC_BRAND_COLOR,
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GuiProvider theme={mytheme} colorScheme="light">
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </GuiProvider>
  );
}

export default MyApp;
