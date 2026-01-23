import {
  ChevronRightIcon,
  CommentAiIcon,
  HeartIcon,
  HomeIcon,
  PaintbrushIcon,
  PeopleIcon,
  PersonIcon,
  RepoIcon,
  ThreeBarsIcon,
} from '@primer/octicons-react';
import {
  ActionList,
  ActionMenu,
  Avatar,
  Button,
  Dialog,
  IconButton,
  NavList,
  Stack,
} from '@primer/react';
import { Icons } from './icons';
import { useCallback, useRef, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { TbFilterDollar } from 'react-icons/tb';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onDialogClose = useCallback(() => setIsOpen(false), []);
  return (
    <div className='fixed inset-x-0 top-0  border-b border-default'>
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

            <ActionMenu>
              <ActionMenu.Anchor>
                <Avatar src='/avatar.png' size={28} />
              </ActionMenu.Anchor>
              <ActionMenu.Overlay className='rounded-md!'>
                <ActionList className='z-50!'>
                  <ActionList.Item>
                    <ActionList.LeadingVisual>
                      <PersonIcon />
                    </ActionList.LeadingVisual>
                    Account
                  </ActionList.Item>
                  <ActionList.Item>
                    <ActionList.LeadingVisual>
                      <CommentAiIcon />
                    </ActionList.LeadingVisual>
                    Help Center
                  </ActionList.Item>
                  <ActionList.Item>
                    <ActionList.LeadingVisual>
                      <HeartIcon />
                    </ActionList.LeadingVisual>
                    Wishlist
                  </ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </div>
          <div className='flex items-center gap-2.5 md:hidden'>
            <IconButton
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              icon={ThreeBarsIcon}
              aria-label='Navigation'
            />
            {isOpen && (
              <Dialog
                className='rounded-none! lg:hidden'
                title=''
                onClose={onDialogClose}
                position='right'
                returnFocusRef={buttonRef}
              >
                <Stack>
                  <Button variant='primary' block>
                    Sign Up
                  </Button>
                  <Button block>Login In</Button>
                </Stack>
                <div className='mt-6!'>
                  <NavList>
                    <NavList.Item>
                      <NavList.LeadingVisual>
                        <PaintbrushIcon />
                      </NavList.LeadingVisual>
                      Appearance
                    </NavList.Item>

                    <NavList.Item>
                      <NavList.LeadingVisual>
                        <CommentAiIcon />
                      </NavList.LeadingVisual>
                      Help Center
                    </NavList.Item>
                    <NavList.Item>
                      <NavList.LeadingVisual>
                        <TbFilterDollar />
                      </NavList.LeadingVisual>
                      USD
                      <NavList.TrailingVisual>
                        <ChevronRightIcon />
                      </NavList.TrailingVisual>
                    </NavList.Item>
                  </NavList>
                </div>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
