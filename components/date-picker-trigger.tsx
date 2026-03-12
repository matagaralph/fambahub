import { ChevronDownIcon } from '@primer/octicons-react';

export function DatePickerTrigger() {
  return (
    <div className='p-2'>
      <div className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
        Date
      </div>
      <div className='flex items-center gap-2 mt-1.5 text-sm text-slate-900'>
        <span>Thu, Feb 26</span>
        <ChevronDownIcon size={16} className='ml-auto text-slate-400' />
      </div>
    </div>
  );
}
