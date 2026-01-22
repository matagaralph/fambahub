import { createFileRoute } from '@tanstack/react-router';
import { Text } from '@primer/react';
export const Route = createFileRoute('/')({
  component: Home,
});

const perks = [
  {
    name: 'Free returns',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Same day delivery',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
  },
  {
    name: 'All year discount',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'For the planet',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
];

function Home() {
  return (
    <>
      <section className='relative h-150 w-full overflow-hidden font-sans'>
        <img
          src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'
          alt='Travel landscape'
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black/30' />

        <div className='relative flex h-full flex-col items-center justify-center px-4 text-center text-white'>
          <h1 className='mb-4 text-5xl font-bold tracking-tight sm:text-7xl'>
            Explore the World
          </h1>
          <p className='mb-10 text-lg font-medium sm:text-xl'>
            Plan better with 300,000+ travel experiences.
          </p>

          <div className='flex w-full max-w-4xl items-center rounded-full bg-white p-2 shadow-2xl'>
            <div className='flex flex-1 flex-col items-start px-6 py-2 text-left'>
              <label className='text-sm font-bold text-gray-900'>
                Where to?
              </label>
              <input
                type='text'
                placeholder='Search for a place or activity'
                className='w-full bg-transparent text-gray-600 outline-none placeholder:text-gray-400'
              />
            </div>

            <div className='h-10 w-px bg-gray-200' />

            <div className='flex flex-1 flex-col items-start px-6 py-2 text-left'>
              <label className='text-sm font-bold text-gray-900'>When</label>
              <input
                type='text'
                placeholder='Select Dates'
                className='w-full bg-transparent text-gray-600 outline-none placeholder:text-gray-400'
              />
            </div>

            <button className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#008768] transition-colors hover:bg-[#007056]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
          </div>

          {/* <div className='mt-12 flex gap-3'>
            <span className='h-3 w-3 rounded-full bg-white' />
            <span className='h-3 w-3 rounded-full border-2 border-white' />
            <span className='h-3 w-3 rounded-full border-2 border-white' />
          </div> */}
        </div>
      </section>
    </>
  );
}
