import { useSetTheme, useTheme } from '@atlaskit/app-provider';

export default function ThemeSwitcher() {
  const theme = useTheme();
  const setTheme = useSetTheme();
  console.log(theme);

  return <div onClick={() => setTheme({ light: 'light' })}></div>;
}
