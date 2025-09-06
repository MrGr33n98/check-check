import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import StarRating from '@/components/ui/star-rating';
import { toast } from 'sonner';
import { api } from '@/middleware/authMiddleware';
import { Loader2, Send, CheckCircle, AlertTriangle } from 'lucide-react';

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required.").max(5),
  comment: z.string().min(20, "Comment must be at least 20 characters.").max(1000),
  would_recommend: z.boolean().default(true),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface CreateReviewFormProps {
  companyId: number;
  onReviewSubmit: () => void; // Callback to refresh reviews list
}

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ companyId, onReviewSubmit }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, watch } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      would_recommend: true,
    }
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const ratingValue = watch('rating');

  useEffect(() => {
    register('rating');
  }, [register]);

  const handleRatingChange = (newRating: number) => {
    setValue('rating', newRating, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
    try {
      const payload = {
        review: {
          ...data,
          provider_id: companyId,
        }
      };
      
      await api.post('/reviews', payload);
      
      setSubmissionStatus('success');
      toast.success("Thank you for your review!");
      reset();
      onReviewSubmit(); // Trigger refresh
      setTimeout(() => setSubmissionStatus('idle'), 5000);

    } catch (error: any) {
      setSubmissionStatus('error');
      const errorMessage = error.response?.data?.errors?.join(', ') || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Review submission failed:", error);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <h3 className="text-md font-semibold text-green-800">Review Submitted!</h3>
        <p className="text-green-700 text-sm">Thanks for sharing your feedback.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Write a Review</h3>
      
      {submissionStatus === 'error' && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2 text-sm">
          <AlertTriangle className="w-5 h-5" />
          <span>Failed to submit review. Please try again.</span>
        </div>
      )}

      <div>
        <label className="font-medium text-sm">Your Rating *</label>
        <StarRating rating={ratingValue} onRatingChange={handleRatingChange} />
        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
      </div>

      <div>
        <Textarea {...register("comment")} placeholder="Share details of your own experience with this company *" rows={4} />
        {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="recommend" {...register("would_recommend")} defaultChecked={true} />
        <label htmlFor="recommend" className="text-sm font-medium leading-none">
          I would recommend this company
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Review
          </>
        )}
      </Button>
    </form>
  );
};

export default CreateReviewForm;
