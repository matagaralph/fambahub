type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo_xs: (props: IconProps) => (
    <svg
      viewBox='0 0 130 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <defs>
        <linearGradient
          id='sun-gradient'
          x1='20'
          y1='20'
          x2='100'
          y2='80'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FDB948' />
          <stop offset='1' stopColor='#D69030' />
        </linearGradient>

        <clipPath id='f-shape-clip' className='dark:fill-blue-700'>
          <path d='M0 0H100C116.569 0 130 13.4315 130 30V30H0V0Z' />
          <path d='M0 35H95C103.284 35 110 41.7157 110 50V50C110 58.2843 103.284 65 95 65H0V35Z' />
          <path d='M0 70H75V100H30C13.4315 100 0 86.5685 0 70V70Z' />
        </clipPath>
      </defs>
      <g clipPath='url(#f-shape-clip)'>
        <rect width='130' height='100' fill='#0B2345' />
        <circle cx='55' cy='50' r='42' fill='url(#sun-gradient)' />
      </g>
    </svg>
  ),
  themeIcon: (props: IconProps) => (
    <svg fill='none' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M2.436 4.184C2 5.04 2 6.16 2 8.4v7.2c0 2.24 0 3.36.436 4.216a4 4 0 0 0 1.748 1.748C5.04 22 6.16 22 8.4 22h7.2c2.24 0 3.36 0 4.216-.436a4.005 4.005 0 0 0 .954-.678l.004-.005c.038-.036.075-.073.11-.11l.026-.027.03-.032a4 4 0 0 0 .624-.896C22 18.96 22 17.84 22 15.6V8.4c0-2.24 0-3.36-.436-4.216a4 4 0 0 0-1.748-1.748C18.96 2 17.84 2 15.6 2H8.4c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748Zm2.167 15.247L19.414 4.586A1.994 1.994 0 0 0 18 4H6a2 2 0 0 0-2 2v12c0 .56.23 1.068.603 1.43Z'
        clipRule='evenodd'
      />
    </svg>
  ),
  sunIcon: (props: IconProps) => (
    <svg fill='none' stroke='currentColor' viewBox='0 0 24 24' {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z'
      />
    </svg>
  ),
  autoIcon: (props: IconProps) => (
    <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path
        fillRule='evenodd'
        d='M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm20 0c0 4.427-3.197 8.108-7.408 8.86-.454.08-.68.121-.933.03a1.108 1.108 0 0 1-.525-.44C12 20.218 12 19.945 12 19.4V4.6c0-.545 0-.818.134-1.05.106-.183.327-.368.525-.44.253-.091.48-.05.933.03C17.803 3.892 21 7.573 21 12z'
        clipRule='evenodd'
      />
    </svg>
  ),
  moonIcon: (props: IconProps) => (
    <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
      <path d='M11.54 2.914a1 1 0 0 0-.59-1.865C5.367 1.58 1 6.28 1 12c0 6.076 4.925 11 11 11 5.72 0 10.42-4.365 10.95-9.948a1 1 0 0 0-1.864-.59 7 7 0 1 1-9.547-9.547Z' />
    </svg>
  ),
};
