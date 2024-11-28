"use client";

import { Raleway } from '@next/font/google';
import Header from "./HomePage/Header";
import { Suspense } from "react";
import HeroSection from './HomePage/HeroSection';
import Skeleton from './HomePage/Skeleton';
import dynamic from 'next/dynamic';
import Footer from './HomePage/Footer';

// Dynamically import HeroSection with SSR disabled
const TypeWriterBox = dynamic(() => import('./HomePage/TypeWriterBox'), {
  ssr: false,
});

const GridPosts = dynamic(() => import('./HomePage/GridPosts'), {
  ssr: false,
});

const raleway = Raleway({ variable: '--font-raleway' });

export default function Home() {
  return (
        <div>
          <div className={raleway.variable}>
              <Header/>
          </div>
          <Suspense fallback={<Skeleton className="w-full max-w-md mx-auto" />}> {/* Use Skeleton as fallback */}
            <TypeWriterBox />
          </Suspense>
          <HeroSection />
          <Suspense fallback={<Skeleton className="h-60 w-full max-w-md mx-auto mt-4" />}>
            <GridPosts />
          </Suspense>
          <Footer/>
        </div>
  );
}
