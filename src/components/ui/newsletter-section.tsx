import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterSectionProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ 
  title = "Fique por dentro das novidades",
  subtitle = "Receba ofertas e tendências do setor solar direto no seu e-mail",
  placeholder = "Seu melhor e-mail"
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would be an API call
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none text-lg"
            required
          />
          <Button 
            type="submit"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-lg"
          >
            {isSubscribed ? 'Inscrito!' : 'Assinar'}
            {!isSubscribed && <ChevronRight className="w-5 h-5" />}
          </Button>
        </form>
        
        {isSubscribed && (
          <p className="text-blue-100 mt-4 font-medium">
            ✅ Obrigado! Você receberá nossas novidades em breve.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;