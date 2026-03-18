'use client';
import { useDebounced } from '@/hooks/useDebounce';
import { SearchIcon, XIcon } from '@primer/octicons-react';
import { VscSync } from 'react-icons/vsc';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LiaMapSignsSolid } from 'react-icons/lia';
import { DatePickerTrigger } from './date-picker-trigger';
import { TravellersTrigger } from './travellers-trigger';

type ResultItem =
  | { kind: 'destination'; data: Destination }
  | { kind: 'attraction'; data: Attraction }
  | { kind: 'search'; term: string };

const TARGET_TOTAL = 7;
const DEFAULT_DESTINATIONS = 4;
const DEFAULT_ATTRACTIONS = 3;

function allocateCounts(
  destTotal: number,
  attrTotal: number,
): { destCount: number; attrCount: number } {
  let destCount = Math.min(destTotal, DEFAULT_DESTINATIONS);
  let attrCount = Math.min(attrTotal, DEFAULT_ATTRACTIONS);
  const remainder = TARGET_TOTAL - destCount - attrCount;

  if (remainder > 0) {
    if (destCount < destTotal) {
      destCount += Math.min(remainder, destTotal - destCount);
    } else if (attrCount < attrTotal) {
      attrCount += Math.min(remainder, attrTotal - attrCount);
    }
  }

  return { destCount, attrCount };
}

async function fetchResults(
  searchTerm: string,
  currencyCode = 'USD',
): Promise<SearchResults> {
  const res = await fetch('/api/auxiliary/search/freetext', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      searchTerm,
      currency: currencyCode,
      searchTypes: [
        {
          searchType: 'ATTRACTIONS',
          pagination: { start: 1, count: TARGET_TOTAL },
        },
        {
          searchType: 'DESTINATIONS',
          pagination: { start: 1, count: TARGET_TOTAL },
        },
      ],
    }),
  });

  if (!res.ok) throw new Error('Failed to fetch results');
  return res.json();
}

type ResultRowProps = {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  isFocused: boolean;
  onFocus: () => void;
  onClick: () => void;
};

function ResultRow({
  icon,
  label,
  sublabel,
  isFocused,
  onFocus,
  onClick,
}: ResultRowProps) {
  return (
    <button
      role='option'
      aria-selected={isFocused}
      onClick={onClick}
      onMouseEnter={onFocus}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
        isFocused ? 'bg-slate-50' : 'bg-white'
      }`}
    >
      <span>{icon}</span>
      {/* <span
        className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
          isFocused
            ? 'bg-slate-200 text-slate-600'
            : 'bg-slate-100 text-slate-500'
        }`}
      >
        {icon}
      </span> */}
      <div className='min-w-0'>
        <p className='text-sm font-medium text-default truncate'>{label}</p>
        <p className='text-xs text-muted truncate'>{sublabel}</p>
      </div>
    </button>
  );
}

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const debouncedSearchTerm = useDebounced(searchTerm, 400);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => fetchResults(debouncedSearchTerm),
    enabled: debouncedSearchTerm.trim().length > 0,
  });

  const router = useRouter();

  const destTotal = data?.destinations?.totalCount ?? 0;
  const attrTotal = data?.attractions?.totalCount ?? 0;
  const { destCount, attrCount } = allocateCounts(destTotal, attrTotal);

  const destinations = data?.destinations?.results?.slice(0, destCount) ?? [];
  const attractions = data?.attractions?.results?.slice(0, attrCount) ?? [];
  const hasResults = destinations.length > 0 || attractions.length > 0;

  const items: ResultItem[] = [
    ...destinations.map((d): ResultItem => ({ kind: 'destination', data: d })),
    ...attractions.map((a): ResultItem => ({ kind: 'attraction', data: a })),
    ...(debouncedSearchTerm.trim().length > 0
      ? [{ kind: 'search' as const, term: debouncedSearchTerm }]
      : []),
  ];

  const showPanel =
    isOpen &&
    debouncedSearchTerm.trim().length > 0 &&
    (hasResults || !isFetching);

  const handleSelect = useCallback(
    (item: ResultItem) => {
      setIsOpen(false);
      setFocusedIndex(-1);
      inputRef.current?.blur();

      if (item.kind === 'destination' || item.kind === 'attraction') {
        const name = item.data.name || '';
        const slug = name.trim().replace(/\s+/g, '-');
        router.push(`/${slug}/${item.data.id}`);
        return;
      }

      if (item.kind === 'search') {
        router.push(`/search?term=${encodeURIComponent(item.term)}`);
      }
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showPanel) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(items[focusedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
      inputRef.current?.blur();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className='relative w-[85vw] max-w-xl lg:max-w-3xl pointer-events-auto'
    >
      <div className='border border-default rounded-xl overflow-hidden bg-white'>
        <div className='grid grid-cols-2 divide-x divide-slate-300'>
          <DatePickerTrigger />
          <TravellersTrigger />
        </div>

        <div className='border-t border-slate-300 p-2'>
          <div className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
            Search
          </div>
          <div className='flex items-center gap-2 mt-1.5 text-sm text-slate-900'>
            {isFetching ? (
              <VscSync className='text-slate-400 size-5 shrink-0 animate-spin' />
            ) : (
              <SearchIcon size={16} className='text-slate-400 shrink-0' />
            )}
            <input
              ref={inputRef}
              // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
              role='combobox'
              aria-expanded={showPanel}
              aria-autocomplete='list'
              value={searchTerm}
              type='text'
              placeholder='Search for a place or activity'
              className='bg-transparent text-sm text-default placeholder-slate-400 outline-none w-full'
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFocusedIndex(-1);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={(e) => {
                if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
                  setIsOpen(false);
                  setFocusedIndex(-1);
                }
              }}
              onKeyDown={handleKeyDown}
            />
            {searchTerm && (
              <button
                tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchTerm('');
                  setFocusedIndex(-1);
                  inputRef.current?.focus();
                }}
              >
                <XIcon
                  size={16}
                  className='text-slate-400 hover:text-slate-600'
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {showPanel && (
        <div className='absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden'>
          <div role='listbox' className='divide-y divide-muted'>
            {destinations.map((dest, i) => (
              <ResultRow
                key={`dest-${dest.id}`}
                icon={
                  <HiOutlineLocationMarker className='size-6 text-app-gold' />
                }
                label={dest.name}
                sublabel={dest.parentDestinationName}
                isFocused={focusedIndex === i}
                onFocus={() => setFocusedIndex(i)}
                onClick={() =>
                  handleSelect({ kind: 'destination', data: dest })
                }
              />
            ))}

            {attractions.map((attr, i) => {
              const index = destinations.length + i;
              return (
                <ResultRow
                  key={`attr-${attr.id}`}
                  icon={<LiaMapSignsSolid className='size-6 text-app-gold' />}
                  label={attr.name}
                  sublabel={attr.destinationName}
                  isFocused={focusedIndex === index}
                  onFocus={() => setFocusedIndex(index)}
                  onClick={() =>
                    handleSelect({ kind: 'attraction', data: attr })
                  }
                />
              );
            })}

            {!isFetching && !hasResults && (
              <div className='px-4 py-3 text-sm text-center text-muted'>
                No results for &quot;{debouncedSearchTerm}&quot;
              </div>
            )}

            {debouncedSearchTerm.trim().length > 0 && (
              <button
                tabIndex={-1}
                className={`w-full flex items-center gap-3 px-4 py-3 border-t border-slate-100 text-left transition-colors ${
                  focusedIndex === items.length - 1
                    ? 'bg-slate-50'
                    : 'bg-white hover:bg-slate-50'
                }`}
                onMouseEnter={() => setFocusedIndex(items.length - 1)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect({ kind: 'search', term: debouncedSearchTerm });
                }}
              >
                <SearchIcon className='shrink-0 size-5 text-app-gold' />
                {/* <span className='shrink-0 flex items-center justify-center text-app-gold w-8 h-8 rounded-full'>
                
                </span> */}
                <p className='text-sm text-slate-600'>
                  Search for
                  <span className='font-medium mx-1 text-slate-900'>
                    &quot;{debouncedSearchTerm}&quot;
                  </span>
                </p>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
