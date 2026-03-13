import HeroSearch from '@/components/hero-search';
import TagScroller from '@/components/tags-scroller';

export default function IndexPage() {
  return (
    <>
      <div className='bg-muted px-4 pt-6 pb-12'>
        <TagScroller />
        <div className='mt-8 w-full flex justify-center'>
          <HeroSearch />
        </div>
      </div>
      {/* <Incentives />   */}
    </>
  );
}
