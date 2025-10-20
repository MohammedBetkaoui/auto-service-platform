import { Star, ThumbsUp, Calendar, User } from 'lucide-react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Avatar } from '../../ui/avatar';
import { useState } from 'react';

interface Review {
  id: string;
  orderId: string;
  service: string;
  provider: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: 'REV-001',
    orderId: 'ORD-001',
    service: 'Lavage Premium',
    provider: {
      name: 'Ahmed Benali',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed',
    },
    rating: 5,
    comment: 'Service exceptionnel ! Mon véhicule est impeccable. Le prestataire est arrivé à l\'heure et a fait un travail professionnel.',
    date: '2025-10-16',
    helpful: 12,
  },
];

export function ClientReviews() {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white mb-2">Mes Avis</h2>
        <p className="text-gray-400 text-sm">
          Partagez votre expérience avec nos prestataires
        </p>
      </div>

      {/* Write Review Card */}
      <Card className="bg-[#0F0F0F] border-white/10 p-6">
        <h3 className="text-white mb-4">Écrire un nouvel avis</h3>
        
        {/* Star Rating */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-2 block">Note</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewReview({ ...newReview, rating: star })}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={star <= newReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-2 block">Commentaire</label>
          <Textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Partagez votre expérience..."
            className="bg-[#1a1a1a] border-white/10 text-white min-h-[120px]"
          />
        </div>

        <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white">
          Publier l'avis
        </Button>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-white">Avis précédents ({mockReviews.length})</h3>
        
        {mockReviews.map((review) => (
          <Card key={review.id} className="bg-[#0F0F0F] border-white/10 p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-12 h-12 border-2 border-white/10">
                <img src={review.provider.avatar} alt={review.provider.name} />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white">{review.provider.name}</p>
                    <p className="text-gray-400 text-sm">{review.service}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{review.comment}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(review.date).toLocaleDateString('fr-FR')}
                  </div>
                  <button className="flex items-center gap-1 hover:text-[#FF6B35] transition-colors">
                    <ThumbsUp size={14} />
                    {review.helpful} personnes ont trouvé cet avis utile
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
