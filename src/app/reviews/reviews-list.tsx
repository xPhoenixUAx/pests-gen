'use client';

import {
  MessageSquareQuote,
  PhoneCall,
  ShieldCheck,
  Star,
  Tag,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Review } from '@/lib/constants';

const AVATAR_STYLES = [
  'bg-gradient-to-br from-primary/25 to-primary/10 text-primary',
  'bg-gradient-to-br from-emerald-500/25 to-emerald-500/10 text-emerald-700',
  'bg-gradient-to-br from-amber-500/25 to-amber-500/10 text-amber-700',
  'bg-gradient-to-br from-sky-500/25 to-sky-500/10 text-sky-700',
  'bg-gradient-to-br from-violet-500/25 to-violet-500/10 text-violet-700',
] as const;

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [visibleCount, setVisibleCount] = useState(4);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <div className="mt-8 space-y-4">
      {visibleReviews.map((review, index) => {
        const accent =
          index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-emerald-500' : 'bg-amber-500';
        const avatarStyle = AVATAR_STYLES[hashString(review.name) % AVATAR_STYLES.length];

        return (
          <Card
            key={`${review.name}-${review.avatarId}-${index}`}
            className="relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className={cn('absolute left-0 top-0 bottom-0 w-1.5', accent)} />
            <CardContent className="p-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex items-start gap-3 min-w-0">
                  <Avatar>
                    <AvatarFallback
                      className={cn(
                        'font-semibold ring-1 ring-border/60',
                        avatarStyle
                      )}
                    >
                      {getInitials(review.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{review.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground truncate">{review.service}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {[...Array(5)].map((_, i) => {
                    const filled = i < (review.rating ?? 5);
                    return (
                      <Star
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          filled ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                        )}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 relative rounded-2xl bg-secondary p-5 min-h-[104px]">
                <MessageSquareQuote
                  className="absolute right-4 top-4 h-6 w-6 text-primary/30 pointer-events-none"
                  aria-hidden="true"
                />
                <p
                  className="text-muted-foreground leading-relaxed text-left pr-10"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {review.comment}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {hasMore ? (
        <div className="pt-2 flex justify-center">
          <Button onClick={() => setVisibleCount(reviews.length)} className="font-bold">
            Show More Reviews
          </Button>
        </div>
      ) : null}

      <Card className="mt-8 bg-secondary">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <PhoneCall className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">Want results like these?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Book an inspection and get a clear plan for your home.
              </p>
            </div>
          </div>
          <Button asChild className="font-bold">
            <Link href="/contact">
              Schedule an Inspection <ShieldCheck className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
