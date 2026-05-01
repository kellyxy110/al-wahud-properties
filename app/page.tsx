import { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import StoryReels from '@/app/components/StoryReels';
import SidebarNav from '@/app/components/SidebarNav';
import FeaturedProperties from '@/app/components/FeaturedProperties';
import Services from '@/app/components/Services';
import HomeAbout from '@/app/components/HomeAbout';
import HomeCertifications from '@/app/components/HomeCertifications';
import Testimonials from '@/app/components/Testimonials';
import BlogPreview from '@/app/components/BlogPreview';
import Footer from '@/app/components/Footer';

function PropertiesSkeleton() {
  return (
    <section className="py-20 px-4 lg:px-[60px] bg-white">
      <div>
        <div className="text-center mb-14">
          <div className="h-3 w-24 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse" />
          <div className="h-8 w-56 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse" />
          <div className="h-4 w-80 bg-gray-200 rounded-full mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[20px] overflow-hidden animate-pulse" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
              <div className="w-full h-[210px] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function HomePage() {
  return (
    <>
      <Navbar />
      <SidebarNav />
      <main>
        <Hero />
        <StoryReels />
        <Suspense fallback={<PropertiesSkeleton />}>
          <FeaturedProperties />
        </Suspense>
        <Services />
        <HomeAbout />
        <HomeCertifications />
        <Testimonials />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
