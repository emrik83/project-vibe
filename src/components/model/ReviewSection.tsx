import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, formatTimeAgo } from '@/lib/utils';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn(
          'h-4 w-4',
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        )}
      />
    ));
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-medium mb-6">Reviews</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-light">{averageRating.toFixed(1)}</div>
          <div>
            <div className="flex gap-1 mb-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-sm text-gray-500">
              Based on {reviews.length} reviews
            </div>
          </div>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{review.user.name}</div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {formatTimeAgo(new Date(review.date))}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{review.comment}</p>
              
              <div className="flex items-center gap-6">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Helpful ({review.helpful})
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 hover:text-red-600"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No reviews yet. Be the first to review this model!
        </div>
      )}
    </div>
  );
}