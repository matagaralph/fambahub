'use client';
import {
  HeartIcon,
  PersonIcon,
  QuestionIcon,
  SearchIcon,
  SignOutIcon,
} from '@primer/octicons-react';
import { TextInput } from '@primer/react';
import { ElDropdown, ElMenu } from '@tailwindplus/elements/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CurrencySelector } from './ui/currency-selector';

export default function NavBar({
  initialCurrency = 'USD',
}: {
  initialCurrency?: string;
}) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  return (
    <div className='flex items-center px-4 lg:px-6 h-14 min-w-0 border-b border-default'>
      <div className='h-full relative flex-1 flex items-center gap-x-4 min-w-0'>
        <div className='flex-1 flex items-center gap-x-4'>
          <Link className='flex items-center gap-x-3' href='/'>
            <span className='sr-only'>FambaHub home page</span>
            <img src='/favicon.svg' className='w-7' alt='FambaHub logo' />
            <span className='font-semibold'>FambaHub</span>
          </Link>
          <div className='hidden lg:flex items-center gap-x-2' />
        </div>
        {!isHome && (
          <div className='relative hidden lg:flex itemxs-center flex-1 z-20 justify-center'>
            <TextInput
              leadingVisual={SearchIcon}
              placeholder='Search for a place or activity'
              aria-label='Search for a place or activity'
              className='w-full h-9! rounded-xl! bg-background-light! ring-1! ring-gray-400/30! hover:!ring-gray-600/30 !border-none !shadow-none'
            />
          </div>
        )}
        <div className='flex-1 relative hidden lg:flex items-center ml-auto justify-end space-x-4'>
          <nav className='text-sm'>
            <ul className='flex space-x-6 items-center'>
              <li className='navbar-link'>
                <a
                  href='https://turso.tech/app'
                  className='flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-600 hover:text-gray-900'
                  target='_blank'
                >
                  List your place
                </a>
              </li>
              <li className='navbar-link'>
                <a
                  href='https://turso.tech/app'
                  className='flex items-center gap-1.5 whitespace-nowrap font-medium text-gray-600 hover:text-gray-900'
                  target='_blank'
                >
                  Support
                </a>
              </li>
              <li>
                <CurrencySelector initialCurrency={initialCurrency} />
              </li>
              <li className='flex items-center'>
                <ElDropdown className='inline-block'>
                  <button className='w-8 h-8 rounded-full overflow-hidden ring-1 ring-slate-200 focus:outline-none'>
                    <Image
                      src='/avatar.png'
                      alt='User avatar'
                      width={32}
                      height={32}
                      className='w-full h-full object-cover'
                    />
                  </button>
                  <ElMenu
                    popover='auto'
                    //@ts-expect-error
                    anchor='bottom-end'
                    className='w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
                  >
                    <div className='py-1'>
                      <a
                        href='#'
                        className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-hidden'
                      >
                        <PersonIcon size={16} className='text-gray-400' />
                        My Account
                      </a>
                      <Link
                        href='/wishlist'
                        className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-hidden'
                      >
                        <HeartIcon size={16} className='text-gray-400' />
                        Wishlist
                      </Link>
                      <Link
                        href='/support'
                        className='flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-hidden'
                      >
                        <QuestionIcon size={16} className='text-gray-400' />
                        Help
                      </Link>
                      <form action='#' method='POST'>
                        <button
                          type='submit'
                          className='flex items-center gap-3 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-hidden'
                        >
                          <SignOutIcon size={16} className='text-gray-400' />
                          Sign out
                        </button>
                      </form>
                    </div>
                  </ElMenu>
                </ElDropdown>
              </li>
            </ul>
          </nav>
        </div>
        <div className='flex lg:hidden items-center gap-3'>
          <button
            type='button'
            className='text-gray-500 w-8 h-8 flex items-center justify-center hover:text-gray-600'
            id='search-bar-entry-mobile'
            aria-label='Open search'
          >
            <span className='sr-only'>Search for a place or activity</span>
            <svg
              className='h-4 w-4 bg-gray-500 hover:bg-gray-600'
              style={{
                WebkitMaskImage:
                  'url(https://d3gk2c5xim1je2.cloudfront.net/v7.1.0/solid/magnifying-glass.svg)',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage:
                  'url(https://d3gk2c5xim1je2.cloudfront.net/v7.1.0/solid/magnifying-glass.svg)',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </button>
          <button
            aria-label='More actions'
            className='h-7 w-5 flex items-center justify-end'
          >
            <svg
              className='h-4 w-4 bg-gray-500 hover:bg-gray-600'
              style={{
                WebkitMaskImage:
                  'url(https://d3gk2c5xim1je2.cloudfront.net/v7.1.0/solid/ellipsis-vertical.svg)',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage:
                  'url(https://d3gk2c5xim1je2.cloudfront.net/v7.1.0/solid/ellipsis-vertical.svg)',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
