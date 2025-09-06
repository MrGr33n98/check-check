from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { BookOpen, Video, FileText, Users } from 'lucide-react';

const EducationalContent: React.FC = () => {
  const content = [
    {
      type: 'article',
      icon: FileText,
      title: 'Como escolher a melhor empresa de energia solar',
      description: 'Guia completo com dicas essenciais para tomar a decisão certa',
      readTime: '5 min',
      category: 'Energia Solar'
    },
    {
      type: 'video',
      icon: Video,
      title: 'Processo de instalação solar explicado',
      description: 'Vídeo detalhado mostrando cada etapa da instalação',
      readTime: '12 min',
      category: 'Tutorial'
    },
    {
      type: 'guide',
      icon: BookOpen,
      title: 'Guia de orçamentos para construção',
      description: 'Aprenda a avaliar e comparar orçamentos de forma eficiente',
      readTime: '8 min',
      category: 'Construção'
    },
    {
      type: 'webinar',
      icon: Users,
      title: 'Webinar: Tendências em tecnologia empresarial',
      description: 'Especialistas discutem as principais tendências do setor',
      readTime: '45 min',
      category: 'Tecnologia'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Conteúdo Educativo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aprenda com nossos especialistas e tome decisões mais informadas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {item.readTime} de leitura
                    </span>
                    <Button size="sm" variant="ghost">
                      Ler mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todo Conteúdo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationalContent;