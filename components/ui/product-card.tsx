import Link from 'next/link';
import type { Product } from '@/app/(site)/[name]/[id]/type';

export function ProductCard({
  product,
  slug,
}: {
  product: Product;
  currency?: string;
  slug: string;
}) {
  const productLink = `/${slug}/p${product.productCode}`;

  const coverImage = (() => {
    const images = product.images;
    if (!images?.length) return null;
    const source = images.find((img) => img.isCover) ?? images[0];
    return (
      source?.variants?.find((v) => v.width >= 400)?.url ??
      source?.variants?.[0]?.url ??
      null
    );
  })();

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.pricing?.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const fromPrice = product.pricing?.summary?.fromPrice;
  const oldPrice = product.pricing?.summary?.fromPriceBeforeDiscount;
  const formattedPrice = fromPrice ? priceFormatter.format(fromPrice) : null;
  const formattedOldPrice = oldPrice ? priceFormatter.format(oldPrice) : null;

  const durationText = (() => {
    const mins = product.duration?.fixedDurationInMinutes;
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h && m) return `${h}h ${m}m`;
    return h ? `${h} hours` : `${m} minutes`;
  })();

  const rating = product.reviews?.combinedAverageRating ?? 0;
  const reviewCount = product.reviews?.totalReviews ?? 0;

  const hasFlag = (flag: string) => product.flags?.includes(flag) ?? false;
  const isLikelyToSellOut = hasFlag('LIKELY_TO_SELL_OUT');
  const isSpecialOffer = hasFlag('SPECIAL_OFFER');
  const isBestSeller = hasFlag('BEST_SELLER');

  return (
    <div className='group flex flex-col bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full relative cursor-pointer'>
      <Link
        href={productLink}
        className='relative aspect-3/2 overflow-hidden bg-slate-100 block'
      >
        {coverImage && (
          <img
            src={coverImage}
            alt={product.title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            loading='lazy'
          />
        )}

        <div className='absolute top-3 left-0 flex flex-col gap-1'>
          {isLikelyToSellOut && (
            <span className='bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow-sm uppercase tracking-wide'>
              Likely to Sell Out
            </span>
          )}
          {isSpecialOffer && (
            <span className='bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow-sm uppercase tracking-wide'>
              Special Offer
            </span>
          )}
          {isBestSeller && (
            <span className='bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow-sm uppercase tracking-wide'>
              Best Seller
            </span>
          )}
        </div>

        <button className='absolute top-2 right-2 p-1.5 rounded-full hover:bg-black/20 transition-colors z-10 group/heart'>
          {/* heart icon */}
        </button>
      </Link>

      <Link href={productLink} className='p-3 flex flex-col flex-1 gap-0.5'>
        <h3 className='text-slate-900 text-base leading-snug line-clamp-2'>
          {product.title}
        </h3>

        {reviewCount > 0 && (
          <div className='flex items-center gap-1 mt-1.5'>
            <div className='flex'>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-xs ${i < Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className='text-xs text-slate-600 flex items-center gap-1'>
              <span className='font-semibold text-slate-900'>
                {rating.toFixed(1)}
              </span>
              <span className='text-slate-400'>·</span>
              <span className='text-slate-500'>
                {reviewCount.toLocaleString()} reviews
              </span>
            </span>
          </div>
        )}

        {durationText && (
          <div className='mt-2 flex items-center gap-1 text-xs text-slate-600'>
            {/* clock icon */}
            <span>{durationText}</span>
          </div>
        )}

        <div className='flex flex-col gap-1 mt-1.5'>
          <div className='flex items-center gap-1.5 text-xs text-slate-600'>
            {/* check-circle icon */}
            <span>Free Cancellation</span>
          </div>
          <p className='text-sm text-slate-600 mt-1'>
            from{' '}
            {isSpecialOffer && formattedOldPrice && (
              <span className='line-through text-red-600 mr-1'>
                {formattedOldPrice}
              </span>
            )}
            <span className='font-bold text-base text-slate-900'>
              {formattedPrice}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
