'use client';

import { Button, Spinner } from '@primer/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState, useEffect, useCallback } from 'react';

type Tag = {
  tagId: number;
  allNamesByLocale: Record<string, string>;
};

type TagsResponse = {
  tags: Tag[];
};

async function fetchTags(): Promise<Tag[]> {
  const res = await fetch('/api/demand/products/tags');

  if (!res.ok) {
    throw new Error('Failed to fetch tags');
  }

  const data: TagsResponse = await res.json();
  return data.tags;
}

const SCROLL_AMOUNT = 300;

type TagScrollerProps = {
  /** Match this to your page/section background colour so the fade blends in. Defaults to #f6f6f6. */
  bgColor?: string;
};

export default function TagScroller({ bgColor = '#f6f6f6' }: TagScrollerProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  console.log(selected);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [tags, updateScrollState]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className='px-2 py-2 text-sm'>Failed to load tags</div>;
  }

  return (
    <div className='relative flex items-center'>
      {canScrollLeft && (
        <div className='absolute left-0 z-10 flex items-center h-full'>
          <div
            className='w-16 h-full pointer-events-none'
            style={{
              background: `linear-gradient(to right, ${bgColor} 40%, transparent)`,
            }}
          />
          <button
            onClick={scrollLeft}
            className='absolute left-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 shadow-sm hover:brightness-95 transition-all'
            style={{ backgroundColor: bgColor }}
            aria-label='Scroll left'
          >
            <ChevronLeftIcon size={16} />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className='flex gap-2 overflow-x-auto px-2 py-2 scroll-smooth'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.tag-scroller::-webkit-scrollbar { display: none; }`}</style>

        {tags.map((tag) => {
          const isSelected = selected === tag.tagId;

          return (
            <Button
              key={tag.tagId}
              variant={isSelected ? 'primary' : 'default'}
              onClick={() => setSelected(tag.tagId)}
            >
              {tag.allNamesByLocale.en ?? 'Unknown'}
            </Button>
          );
        })}
      </div>

      {canScrollRight && (
        <div className='absolute right-0 z-10 flex items-center h-full'>
          <div
            className='w-16 h-full pointer-events-none'
            style={{
              background: `linear-gradient(to left, ${bgColor} 40%, transparent)`,
            }}
          />
          <button
            onClick={scrollRight}
            className='absolute right-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 shadow-sm hover:brightness-95 transition-all'
            style={{ backgroundColor: bgColor }}
            aria-label='Scroll right'
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
