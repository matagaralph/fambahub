const Logo = ({ className = 'h-14 w-auto font-sans!' }) => {
  return (
    <svg
      viewBox='0 0 420 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
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

        <clipPath id='f-shape-clip'>
          <path d='M0 0H100C116.569 0 130 13.4315 130 30V30H0V0sZ' />
          <path d='M0 35H95C103.284 35 110 41.7157 110 50V50C110 58.2843 103.284 65 95 65H0V35Z' />
          <path d='M0 70H75V100H30C13.4315 100 0 86.5685 0 70V70Z' />
        </clipPath>
      </defs>

      <g clipPath='url(#f-shape-clip)'>
        <rect width='130' height='100' fill='#0B2345' />
        <circle cx='55' cy='50' r='42' fill='url(#sun-gradient)' />
      </g>

      <g transform='translate(150, 0)'>
        <text
          y='62'
          fontFamily='Inter'
          fontWeight='800'
          fontSize='52'
          style={{ letterSpacing: '-0.02em' }}
        >
          <tspan fill='#0B2345'>famba</tspan>
          <tspan fill='#FDB948'>hub</tspan>
        </text>

        <text
          x='266'
          y='88'
          fontFamily='Inter'
          fontWeight='600'
          fontSize='22'
          fill='#0B2345'
          textAnchor='end'
          style={{ letterSpacing: '0.02em' }}
        >
          Explore The World.
        </text>
      </g>
    </svg>
  );
};

export default Logo;
