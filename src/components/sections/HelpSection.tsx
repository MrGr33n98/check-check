import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Como funciona a plataforma Compare Solar?',
    answer: 'Nossa plataforma conecta você a uma vasta rede de empresas de energia solar. Você pode pesquisar, comparar perfis, ler avaliações de clientes e solicitar orçamentos, tudo em um só lugar.',
  },
  {
    question: 'É gratuito usar a plataforma para encontrar empresas?',
    answer: 'Sim, para consumidores e empresas que buscam fornecedores, o uso da plataforma é totalmente gratuito. Você pode pesquisar e solicitar quantos orçamentos precisar sem custo algum.',
  },
  {
    question: 'Como as empresas são verificadas?',
    answer: 'Realizamos um processo de verificação que inclui a checagem de CNPJ, certificações e histórico da empresa. Empresas com o selo "Verificada" passaram por essa análise.',
  },
  {
    question: 'O que devo considerar ao escolher uma empresa de energia solar?',
    answer: 'Avalie a experiência da empresa, as avaliações de outros clientes, as certificações dos profissionais, a qualidade dos equipamentos oferecidos (painéis e inversores) e as garantias do serviço e dos produtos.',
  },
  {
    question: 'Tenho uma empresa de energia solar. Como posso me cadastrar?',
    answer: 'É simples! Clique no botão "Cadastrar Empresa" no topo da página e preencha o formulário. Nossa equipe entrará em contato para finalizar o processo e criar seu perfil na plataforma.',
  },
];

const HelpSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Dúvidas Frequentes</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Tudo o que você precisa saber para começar sua jornada solar com o pé direito.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
