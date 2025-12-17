import AppProvider from '@atlaskit/app-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';

const RootLayout = () => (
  <AppProvider defaultColorMode='light'>
    <Outlet />
  </AppProvider>
);

export const Route = createRootRoute({ component: RootLayout });
