import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import SeriesGrid from '../components/SeriesGrid';
import ProductGrid from '../components/ProductGrid';
import PromoBanners from '../components/PromoBanners';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <div className="px-6 pt-8">
        <SeriesGrid />
      </div>
      <div className="px-6 pt-8 pb-6">
        <ProductGrid />
      </div>
      <PromoBanners />
    </>
  );
}
