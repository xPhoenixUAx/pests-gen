import Image from 'next/image';
import type { Metadata } from 'next';

import { COMPANY_NAME } from '@/lib/constants';
import { FaqSection } from '@/components/faq-section';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: `Find answers to common questions about pest control, wildlife removal, our services, and pricing from ${COMPANY_NAME}.`,
};

export default function FaqPage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full pt-32 pb-16 md:pt-48 md:pb-24 bg-secondary">
        <Image
          src="/images/ui/2149051315.jpg"
          alt="FAQ header background."
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative px-4 md:px-6 text-center text-white space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="max-w-[700px] mx-auto text-lg md:text-xl">
            Have questions? We have answers. Find information about our services
            below.
          </p>
        </div>
      </section>

      <section id="faq-generator">
        <div className="container px-4 md:px-6">
          <FaqSection />
        </div>
      </section>
    </div>
  );
}
