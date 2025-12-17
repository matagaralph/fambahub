import { useColorMode, useSetColorMode } from '@atlaskit/app-provider';
import { IconButton } from '@atlaskit/button/new';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';

export default function ThemeSwitcher() {
  const colorMode = useColorMode();
  const setColorMode = useSetColorMode();

  const isDark = colorMode === 'dark';

  return (
    <IconButton
      onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
      icon={() =>
        isDark ? (
          <BsSunFill className='size-4' />
        ) : (
          <BsFillMoonStarsFill className='size-4' />
        )
      }
      label='Switch theme'
    />
  );
}
