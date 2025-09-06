import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    
    // Simulate API call
    try {
      // Replace with your actual newsletter API endpoint
      // await api.post('/newsletter/subscribe', { email });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thanks for subscribing! Check your inbox for a confirmation.");
      setEmail('');
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">Fique por Dentro do Setor Solar</h2>
            <p className="mt-2 text-gray-300 max-w-lg">
              Assine nossa newsletter e receba as últimas notícias, tendências e guias sobre energia solar.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              disabled={loading}
              required
            />
            <Button type="submit" variant="default" size="lg" disabled={loading}>
              {loading ? 'Enviando...' : <><Send className="w-4 h-4 md:mr-2" /><span className="hidden md:inline">Inscrever</span></>}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
