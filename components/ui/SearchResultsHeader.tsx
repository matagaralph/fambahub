'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { TriangleDownIcon } from '@primer/octicons-react';
import { Button } from '@primer/react';

const SORT_OPTIONS = [
  { label: 'Featured', value: 'DEFAULT' },
  { label: 'Traveler Rating', value: 'TRAVELER_RATING' },
  { label: 'Price (Low to High)', value: 'PRICE_ASC' },
  { label: 'Price (High to Low)', value: 'PRICE_DESC' },
  { label: 'Duration (Short to Long)', value: 'DURATION_ASC' },
  { label: 'Duration (Long to Short)', value: 'DURATION_DESC' },
];

export function SearchResultsHeader({
  count,
  page,
  selectedSort,
  onSelectedSortChange,
}: {
  count: number;
  page: number;
  selectedSort: string;
  onSelectedSortChange: (value: string) => void;
}) {
  const selected =
    SORT_OPTIONS.find((o) => o.value === selectedSort) ?? SORT_OPTIONS[0];

  return (
    <div className='flex flex-col mb-4 sm:flex-row sm:items-center justify-between gap-4'>
      <div className='text-sm font-bold text-slate-900 flex items-center gap-2'>
        {count.toLocaleString()} results
        {page > 1 && (
          <span className='font-normal text-slate-500'>
            &middot; Page {page}
          </span>
        )}
      </div>

      <div className='flex items-center gap-2 self-end sm:self-auto'>
        <Listbox
          value={selected}
          onChange={(o) => onSelectedSortChange(o.value)}
        >
          <div className='relative'>
            <ListboxButton className='grid w-full focus:outline-0'>
              <Button variant='invisible' trailingAction={TriangleDownIcon}>
                Sort By: {selected.label}
              </Button>
            </ListboxButton>

            <ListboxOptions
              transition
              className='absolute right-0 z-10 mt-1 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-slate-200 outline-none data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm'
            >
              {SORT_OPTIONS.map((option, index) => (
                <div key={option.value}>
                  <ListboxOption
                    value={option}
                    className='group relative cursor-default select-none py-2.5 pr-4 pl-9 text-slate-900 data-focus:bg-slate-100 data-focus:outline-none'
                  >
                    <span className='block truncate font-normal group-data-selected:font-semibold'>
                      {option.label}
                    </span>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-600 group-not-data-selected:hidden'>
                      <CheckIcon aria-hidden='true' className='size-4' />
                    </span>
                  </ListboxOption>
                  {index < SORT_OPTIONS.length - 1 && (
                    <div className='border-t border-default' />
                  )}
                </div>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
