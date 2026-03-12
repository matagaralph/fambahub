import { ChevronDownIcon } from '@primer/octicons-react';

export function TravellersTrigger() {
  return (
    <div className='p-2'>
      <div className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
        Travelers
      </div>
      <div className='flex items-center gap-2 mt-1.5 text-sm text-slate-900'>
        <span>2 travellers, 1 Room</span>
        <ChevronDownIcon size={16} className='ml-auto text-slate-400' />
      </div>
    </div>
  );
}
