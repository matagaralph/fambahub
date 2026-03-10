'use client';
import {
  ChevronDownIcon,
  SearchIcon,
  SyncIcon,
  XIcon,
} from '@primer/octicons-react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

async function fetchResults(searchTerm: string, currencyCode: string = 'USD') {
  const res = await fetch('/api/auxiliary/search/freetext', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      searchTerm,
      currency: currencyCode,
      searchTypes: [
        {
          searchType: 'ATTRACTIONS',
          pagination: { start: 1, count: 3 },
        },
        {
          searchType: 'DESTINATIONS',
          pagination: { start: 1, count: 4 },
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch results');
  }

  return res.json();
}

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounced(searchTerm, 400);

  const onInput = (e: any) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm('');

  const onFocus = () => {
    // handle focus if needed
  };

  const onKeydown = (e: any) => {
    // handle key events if needed
  };

  const { data, isFetching } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: async () => await fetchResults(debouncedSearchTerm),
    enabled: debouncedSearchTerm.trim().length > 0,
  });

  console.log(data);

  return (
    <div className='w-[85vw] max-w-xl lg:max-w-3xl pointer-events-auto'>
      <div className='border border-default rounded-xl overflow-hidden bg-white'>
        {/* Date and Travelers */}
        <div className='grid grid-cols-2 divide-x divide-slate-300'>
          <div className='p-2'>
            <div className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
              Date
            </div>
            <div className='flex items-center gap-2 mt-1.5 text-sm text-slate-900'>
              <span>Thu, Feb 26</span>
              <ChevronDownIcon size={16} className='ml-auto text-slate-400' />
            </div>
          </div>
          <div className='p-2'>
            <div className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
              Travelers
            </div>
            <div className='flex items-center gap-2 mt-1.5 text-sm text-slate-900'>
              <span>2 travellers, 1 Room</span>
              <ChevronDownIcon size={16} className='ml-auto text-slate-400' />
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className='border-t border-slate-300 p-2'>
          <div className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
            Search
          </div>
          <div className='flex items-center gap-2 mt-1.5 text-sm text-slate-900'>
            {isFetching ? (
              <SyncIcon
                size={16}
                className='text-slate-400 shrink-0 animate-spin'
              />
            ) : (
              <SearchIcon size={16} className='text-slate-400 shrink-0' />
            )}
            <input
              value={searchTerm}
              type='text'
              placeholder='Search for a place or activity'
              className='bg-transparent text-sm text-default placeholder-slate-400 outline-none w-full'
              onChange={onInput}
              onFocus={onFocus}
              onKeyDown={onKeydown}
            />
            {searchTerm && (
              <button className='shrink-0' onClick={clearSearch}>
                <XIcon
                  size={16}
                  className='text-slate-400 hover:text-slate-600'
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
