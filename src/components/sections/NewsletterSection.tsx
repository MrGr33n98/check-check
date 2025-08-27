import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Gift, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  Star
} from 'lucide-react';

interface NewsletterBenefit {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: NewsletterBenefit[] = [
  {
    id: '1',
    title: 'Dicas Exclusivas',
    description: 'Receba semanalmente dicas para maximizar sua economia',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: '2',
    title: 'Ofertas Especiais',
    description: 'Seja o primeiro a saber sobre promoções e descontos',
    icon: <Gift className="w-5 h-5" />
  },
  {
    id: '3',
    title: 'Novidades do Setor',
    description: 'Fique por dentro das últimas tecnologias e regulamentações',
    icon: <Zap className="w-5 h-5" />
  }
];

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Por favor, insira seu e-mail');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Por favor, insira um e-mail válido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Salvar no localStorage para demonstração
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }
      
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-green-950/20">
        <div className="container px-4">
          <Card className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🎉 Inscrição Confirmada!
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Obrigado por se inscrever! Você receberá nossa primeira newsletter 
                com dicas exclusivas em breve.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Conteúdo Premium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span>Ofertas Exclusivas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span>Novidades em Primeira Mão</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              <span>Newsletter Gratuita</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Fique Por Dentro do
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                {' '}Mundo Solar
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Receba semanalmente as melhores dicas, novidades e ofertas exclusivas 
              sobre energia solar diretamente no seu e-mail.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                O que você vai receber:
              </h3>
              
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Social Proof */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      15.000+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Pessoas já inscritas
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                    4.9/5 (2.341 avaliações)
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                  "Conteúdo de qualidade que realmente me ajudou a entender 
                  melhor sobre energia solar!" - Maria S.
                </p>
              </div>
            </div>

            {/* Newsletter Form */}
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Inscreva-se Gratuitamente
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Sem spam. Cancele quando quiser.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-center"
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2 text-center">
                        {error}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Inscrevendo...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Quero Receber Gratuitamente</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </form>
                
                <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>100% Gratuito</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Sem Spam</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Cancele Quando Quiser</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  Ao se inscrever, você concorda com nossa{' '}
                  <a href="/privacidade" className="text-blue-500 hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;