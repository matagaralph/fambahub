'use client';
import Logo from '@/components/logo';
import AppLogo from '@/components/logo';
import { Button, FormControl, TextInput } from '@primer/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignInPage() {
  return (
    <main className='bg-white min-h-dvh flex items-center justify-center'>
      <div className='flex flex-col mx-auto max-w-96 p-5 pb-24 gap-12 w-full'>
        <Link href='/' className=''>
          <Logo />
        </Link>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-medium leading-8 text-slate-900'>
              Sign in to FambaHub
            </h1>
            <div className='flex gap-1'>
              <p className='text-sm  text-muted tracking-tight'>
                Don&apos;t have an account?
              </p>
              <Link
                href='/sign-up'
                rel='noopener noreferrer'
                className='text-sm font-medium text-link  inline-flex items-center gap-1'
              >
                Create account
                <span
                  className='iconify i-lucide:arrow-right size-3.5'
                  aria-hidden='true'
                />
              </Link>
            </div>
          </div>
          {/**/}
          <form className='flex flex-col gap-3.5'>
            <div className='flex flex-col gap-1.5'>
              <FormControl required>
                <FormControl.Label>Email address</FormControl.Label>
                <TextInput
                  className='h-9!'
                  type='email'
                  placeholder='Enter your email address'
                  block
                />
              </FormControl>
            </div>
            <div className='flex flex-col gap-1.5'>
              {/* <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-5 tracking-tight text-slate-700'
                >
                  Password
                </label>
                <a
                  href='/auth/forgot-password'
                  className='text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors'
                >
                  Forgot password?
                </a>
              </div> */}

              <FormControl required>
                <FormControl.Label>Password</FormControl.Label>
                <TextInput
                  className='h-9!'
                  block
                  type='password'
                  placeholder='Enter your password'
                />
              </FormControl>
            </div>
            <Button type='submit' className='h-9! mt-4' variant='primary'>
              Continue
            </Button>
          </form>
          <div className='flex items-center gap-2.5'>
            <div className='grow h-px bg-(--borderColor-default)' />
            <span className='text-[11px] text-slate-400'>OR</span>
            <div className='grow h-px bg-(--borderColor-default)' />
          </div>
          <Button className='h-9!'>
            <FcGoogle className='size-5 mx-1 inline-flex' /> Continue with
            Google
          </Button>

          <p className='text-sm text-default leading-relaxed'>
            By signing in or creating an account, you agree to the
            <Link
              href='/legal/privacy'
              className='mx-1 no-underline text-link underline-offset-[3px]'
            >
              Terms & Conditions
            </Link>
            and
            <Link
              href='#'
              className='mx-1 nounderline text-link underline-offset-[3px]'
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
