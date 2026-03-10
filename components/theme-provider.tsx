'use client';

import { ThemeProvider as PrimerThemeProvider } from '@primer/react';
import { ReactNode } from 'react';
import QueryClientProvider from './query-provider';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <PrimerThemeProvider preventSSRMismatch colorMode='light' dayScheme='light'>
      <QueryClientProvider>{children}</QueryClientProvider>
    </PrimerThemeProvider>
  );
}
