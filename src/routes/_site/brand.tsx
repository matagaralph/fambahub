import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_site/brand')({
  component: TradeMarkPolicy,
});

function TradeMarkPolicy() {
  return (
    <div className='mx-auto px-4 max-w-7xl'>
      <div className='mx-auto flex max-w-2xl gap-x-10 py-10 sm:py-14 lg:max-w-5xl'>
        <div className='w-full flex-1'>
          <div id='content'>
            <header id='header' className='relative z-20'>
              <div>
                <div className='flex items-center'>
                  <h1 className='inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200'>
                    Brand
                  </h1>
                </div>
              </div>
              <p className='mt-2 text-lg text-slate-700 dark:text-slate-400'>
                FambaHub brand assets and usage guidelines.
              </p>
            </header>
          </div>
        </div>
      </div>
      <div className='hidden w-66 lg:block'></div>
    </div>
  );
}
