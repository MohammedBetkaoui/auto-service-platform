import { Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type UserRole = 'client' | 'provider';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  service?: string;
}

interface FeedbacksProps {
  userRole: UserRole;
}

export function Feedbacks({ userRole }: FeedbacksProps) {
  const clientReviews: Review[] = [
    {
      id: '1',
      author: 'Ahmed Belkacem',
      rating: 5,
      comment: 'Service rapide et professionnel. Mon véhicule était impeccable !',
      date: '15 Oct 2025',
      service: 'Lavage complet',
    },
    {
      id: '2',
      author: 'Karim Auto Service',
      rating: 4,
      comment: 'Très satisfait de la vidange. Je recommande vivement.',
      date: '10 Oct 2025',
      service: 'Vidange d\'huile',
    },
  ];

  const providerReviews: Review[] = [
    {
      id: '1',
      author: 'Fatima Meziane',
      rating: 5,
      comment: 'Excellent travail ! Le lavage était parfait et le prestataire très ponctuel.',
      date: '16 Oct 2025',
      service: 'Lavage complet',
    },
    {
      id: '2',
      author: 'Ahmed Benali',
      rating: 5,
      comment: 'Service impeccable, je recommande sans hésitation.',
      date: '14 Oct 2025',
      service: 'Vidange express',
    },
    {
      id: '3',
      author: 'Amina Lahouel',
      rating: 4,
      comment: 'Très bon service, professionnel et rapide.',
      date: '10 Oct 2025',
      service: 'Lavage express',
    },
  ];

  const reviews = userRole === 'client' ? clientReviews : providerReviews;
  const title = userRole === 'client' ? 'Mes avis donnés' : 'Avis reçus';

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-[#1E1E1E]">{title}</h2>
        <Button variant="ghost" className="text-[#0077FF] hover:text-[#0066DD]">
          Voir tous les avis
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={review.author} />
                <AvatarFallback className="bg-[#F5F7FA] text-[#1E1E1E]">
                  {review.author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[#1E1E1E]">{review.author}</p>
                    {review.service && (
                      <p className="text-sm text-gray-500">{review.service}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Average Rating (for providers) */}
      {userRole === 'provider' && (
        <div className="mt-6 bg-[#F5F7FA] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Note moyenne</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-[#1E1E1E]">4.8</span>
                {renderStars(5)}
                <span className="text-sm text-gray-600">(127 avis)</span>
              </div>
            </div>
            <ArrowRight size={20} className="text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
}
