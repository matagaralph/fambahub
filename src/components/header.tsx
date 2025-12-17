import Avatar from '@atlaskit/avatar';
import { Text } from '@atlaskit/primitives/compiled';
import { Link } from '@tanstack/react-router';
import { Icons } from './icons';

import ThemeSwitcher from './theme-switcher';

export function Header() {
  return (
    <div className='flex h-14 items-center justify-between gap-8 px-4 sm:px-6 border-b border-b-default'>
      <div className='flex items-center gap-4'>
        <Link
          className='shrink-0 flex items-center gap-x-4 no-underline'
          aria-label='Home'
          to='/'
        >
          <Icons.logo className='h-5' />
          <Text weight='bold' size='medium'>
            FambaHub
          </Text>
        </Link>
      </div>
      <div className='flex items-center  gap-6 max-md:hidden'>
        <Link
          className='text-sm/6 no-underline text-neutral-950  dark:text-white'
          to='/'
        >
          Attractions
        </Link>
        <Link
          className='text-sm/6 text-neutral-950 no-underline dark:text-white'
          to='/'
        >
          Flights
        </Link>
        <Link
          className='text-sm/6 text-neutral-950 no-underline dark:text-white'
          to='/'
        >
          List your property
        </Link>
        <Link
          className='text-sm/6 text-neutral-950 no-underline dark:text-white'
          to='/'
        >
          Support
        </Link>

        <ThemeSwitcher />
        <Avatar
          appearance='circle'
          src='./avatar.png'
          size='medium'
          name='Scott Farquhar'
        />
      </div>
      <div className='flex items-center gap-2.5 md:hidden'>
        <button
          type='button'
          aria-label='Search'
          className='inline-grid size-7 place-items-center rounded-md'
        >
          <svg viewBox='0 0 16 16' fill='currentColor' className='size-4'>
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <ThemeSwitcher />
        <button
          type='button'
          className='relative inline-grid size-7 place-items-center rounded-md text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/10 undefined'
          aria-label='Navigation'
        >
          <span className='absolute top-1/2 left-1/2 size-11 -translate-1/2 pointer-fine:hidden' />
          <svg viewBox='0 0 16 16' fill='currentColor' className='size-4'>
            <path d='M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z' />
          </svg>
        </button>
      </div>
    </div>
  );
}
