import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { api } from '@/middleware/authMiddleware';
import { Loader2, Send, CheckCircle, AlertTriangle } from 'lucide-react';

const leadFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number is too short." }).optional().or(z.literal('')),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500),
  service_of_interest: z.string().optional(),
  terms_agreed: z.boolean().refine(val => val === true, { message: "You must agree to the terms." }),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  companyId: number;
  companyName: string;
  services: string[];
  source: 'company_page' | 'contact_modal' | 'cta_banner';
}

const LeadForm: React.FC<LeadFormProps> = ({ companyId, companyName, services, source }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      terms_agreed: false,
    }
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit: SubmitHandler<LeadFormValues> = async (data) => {
    try {
      const payload = {
        lead: {
          ...data,
          provider_id: companyId,
          source: source,
        }
      };
      
      await api.post('/leads', payload);
      
      setSubmissionStatus('success');
      toast.success(`Your request has been sent to ${companyName}!`);
      reset();
      setTimeout(() => setSubmissionStatus('idle'), 5000);

    } catch (error: any) {
      setSubmissionStatus('error');
      const errorMessage = error.response?.data?.errors?.join(', ') || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Lead submission failed:", error);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-green-800">Request Sent!</h3>
        <p className="text-green-700">The company will contact you shortly. Thank you!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
        Contact {companyName}
      </h3>
      
      {submissionStatus === 'error' && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Failed to send request. Please try again.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input {...register("name")} placeholder="Your Name *" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Input {...register("email")} placeholder="Your Email *" type="email" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      
      <div>
        <Input {...register("phone")} placeholder="Your Phone (Optional)" type="tel" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      {services && services.length > 0 && (
        <div>
          <Select onValueChange={(value) => control._updateFormState({ ...control._formValues, service_of_interest: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Service of Interest (Optional)" />
            </SelectTrigger>
            <SelectContent>
              {services.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Textarea {...register("message")} placeholder="Your Message *" rows={4} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" {...register("terms_agreed")} />
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to share my contact information with {companyName}.
          </label>
          {errors.terms_agreed && <p className="text-red-500 text-xs">{errors.terms_agreed.message}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Request
          </>
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
