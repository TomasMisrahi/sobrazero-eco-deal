import { Star, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSection = ({ reviews, averageRating, totalReviews }: ReviewSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Rating Summary */}
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</div>
          <div className="flex gap-0.5 justify-center my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= averageRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{totalReviews} reseñas</p>
        </div>
        
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviews.filter((r) => r.rating === rating).length;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-xs w-3">{rating}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id} className="p-3">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-sm">{review.userName}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
