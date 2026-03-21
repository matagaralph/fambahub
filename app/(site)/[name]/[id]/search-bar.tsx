'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { ProductSearchResponse } from './type';
import { ProductCard } from '@/components/ui/product-card';
import { Banner } from '@primer/react';

const DURATION_RANGES: Record<string, { from: number; to: number }> = {
  'up-to-1h': { from: 0, to: 60 },
  '1-to-4h': { from: 60, to: 240 },
  '4h-to-1d': { from: 240, to: 1440 },
  '1-to-3d': { from: 1440, to: 4320 },
  '3d-plus': { from: 4320, to: 43200 },
};

const DEFAULT_DURATION = { from: 0, to: 43200 };

const SORT_MAP: Record<string, { sort: string; order: string }> = {
  TRAVELER_RATING: { sort: 'TRAVELER_RATING', order: 'DESCENDING' },
  PRICE_ASC: { sort: 'PRICE', order: 'ASCENDING' },
  PRICE_DESC: { sort: 'PRICE', order: 'DESCENDING' },
  DURATION_ASC: { sort: 'DURATION', order: 'ASCENDING' },
  DURATION_DESC: { sort: 'DURATION', order: 'DESCENDING' },
};

const PAGE_SIZE = 50;

// Hardcoded for now
const START_DATE = new Date(2026, 2, 25);
const DATE_RANGE = { start: START_DATE, end: addDays(START_DATE, 7) };

export default function SearchResults({
  currency,
  destination,
}: {
  currency: string;
  destination: string;
}) {
  const [sort, setSort] = useState('DEFAULT');
  const [page, setPage] = useState(1);
  const [maxBudget, setMaxBudget] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [specials, setSpecials] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);

  const durationRange = (() => {
    const selected = durations
      .map((key) => DURATION_RANGES[key])
      .filter((r): r is { from: number; to: number } => !!r);
    if (!selected.length) return DEFAULT_DURATION;
    return {
      from: Math.min(...selected.map((r) => r.from)),
      to: Math.max(...selected.map((r) => r.to)),
    };
  })();

  const sortParams = SORT_MAP[sort] ?? { sort: 'DEFAULT', order: 'DESCENDING' };

  const payload = {
    filtering: {
      destination,
      flags: specials.length ? specials : undefined,
      lowestPrice: 0,
      highestPrice: maxBudget,
      startDate: format(DATE_RANGE.start, 'yyyy-MM-dd'),
      endDate: format(DATE_RANGE.end, 'yyyy-MM-dd'),
      includeAutomaticTranslations: true,
      confirmationType: 'INSTANT',
      durationInMinutes: durationRange,
      rating: { from: minRating, to: 5 },
    },
    sorting: sortParams,
    pagination: { start: (page - 1) * PAGE_SIZE + 1, count: 10000 },
    currency,
  };

  const { data, error, status } = useQuery<ProductSearchResponse>({
    queryKey: ['products', payload],
    queryFn: () =>
      fetch('/api/demand/products/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then((r) => r.json()),
  });

  const products = data?.products ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className=''>
      {error && (
        <Banner
          aria-label='Critical'
          title='Critical'
          description='GitHub users are now required to enable two-factor authentication as an additional security measure.'
          variant='critical'
        />
      )}
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {products.map((p) => (
          <ProductCard product={p} key={p.productCode} slug='/' />
        ))}
      </div>
      {/* <SearchPagination
        page={page}
        onPageChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        total={totalCount}
        itemsPerPage={PAGE_SIZE}
      /> */}
    </div>
  );
}
