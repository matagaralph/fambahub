import { ThreeBarsIcon } from '@primer/octicons-react';
import { ActionList, ActionMenu, Avatar, IconButton } from '@primer/react';
import { Icons } from './icons';

export function Header() {
  return (
    <div className='fixed inset-x-0 top-0 z-10 border-b border-default'>
      <div className='bg-default'>
        <div className='flex h-14 items-center justify-between gap-8 px-4 sm:px-6'>
          <div className='flex items-center gap-4 text-base font-bold'>
            <Icons.logo_xs className='size-6' />
            <span className=''>FambaHub</span>
          </div>
          <div className='flex items-center gap-6 max-md:hidden '>
            <a className='text-sm/6 text-gray-950! no-underline!' href='/docs'>
              Home
            </a>
            <a className='text-sm/6 text-gray-950! no-underline!' href='/blog'>
              List your property
            </a>

            <a
              className='text-sm/6 text-gray-950! no-underline!'
              href='/sponsor'
            >
              Blog
            </a>
            {/* <Button>Register</Button> */}
            {/* <a
              href='/plus?ref=top'
              className='group relative px-1.5 text-sm/6 text-sky-800'
            >
              <span className='absolute inset-0 border border-dashed border-sky-300/60 bg-sky-400/10 group-hover:bg-sky-400/15' />
              Plus
              <svg
                width={5}
                height={5}
                viewBox='0 0 5 5'
                className='absolute top-[-2px] left-[-2px] fill-sky-300'
              >
                <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
              </svg>
              <svg
                width={5}
                height={5}
                viewBox='0 0 5 5'
                className='absolute top-[-2px] right-[-2px] fill-sky-300'
              >
                <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
              </svg>
              <svg
                width={5}
                height={5}
                viewBox='0 0 5 5'
                className='absolute bottom-[-2px] left-[-2px] fill-sky-300'
              >
                <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
              </svg>
              <svg
                width={5}
                height={5}
                viewBox='0 0 5 5'
                className='absolute -right-0.5 -bottom-0.5 fill-sky-300'
              >
                <path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z' />
              </svg>
            </a> */}
            <ActionMenu>
              <ActionMenu.Anchor>
                <Avatar src='/avatar.png' size={28} />
              </ActionMenu.Anchor>
              <ActionMenu.Overlay className='rounded-md!'>
                <ActionList className='z-50!'>
                  <ActionList.Item>Sign In</ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </div>
          <div className='flex items-center gap-2.5 md:hidden'>
            {/* <button
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
            </button> */}

            <IconButton icon={ThreeBarsIcon} />
            {/* <button
              type='button'
              className='relative inline-grid size-7 place-items-center rounded-md text-gray-950 hover:bg-gray-950/5 undefined'
              aria-label='Navigation'
            >
              <span className='absolute top-1/2 left-1/2 size-11 -translate-1/2 pointer-fine:hidden' />
              <svg viewBox='0 0 16 16' fill='currentColor' className='size-4'>
                <path d='M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z' />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
      {/* <div className='flex h-14 items-center border-t border-gray-950/5 bg-white px-4 sm:px-6 lg:hidden'>
        <button
          type='button'
          className='relative inline-grid size-7 place-items-center rounded-md text-gray-950 hover:bg-gray-950/5 -ml-1.5'
          aria-label='Open navigation menu'
        >
          <span className='absolute top-1/2 left-1/2 size-11 -translate-1/2 pointer-fine:hidden' />
          <svg viewBox='0 0 16 16' fill='currentColor' className='size-4'>
            <path
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 0 1 2.75 4h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 6.5a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
}
