'use client';

import Image from 'next/image';

export default function MakhanaScene({ classNameProp = '' }) {
  return (
    <div className={`relative w-full h-full rounded-3xl overflow-hidden ${classNameProp}`}>
      <Image
        src="/images/hero/mithila-makhana-hero.webp"
        alt="Premium Mithila Makhana"
        fill
        priority
        className="object-cover object-[75%_center] sm:object-center"
      />
    </div>
  );
}
