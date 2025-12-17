type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg viewBox='0 0 130 100' fill='none' {...props}>
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

        <clipPath id='f-shape-clip'>
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
};
