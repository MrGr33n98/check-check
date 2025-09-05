 Aqui está um **prompt (em texto)** para ajustar o **posicionamento do formulário de avaliação** e da **sidebar de banners** na página mostrada:

---

````
# Ajustar posicionamento do formulário de avaliação + sidebar esquerda (layout responsivo)

## Problema
O formulário de avaliação aparece mal posicionado/fora de alinhamento no desktop, conforme screenshot. A coluna principal (formulário) não está alinhada verticalmente com a sidebar de banners e a largura/centralização do layout precisa ser padronizada.

## Objetivo
- Implementar um layout de duas colunas estável:
  - Sidebar esquerda fixa (largura estável ~320px) com banners (sticky).
  - Coluna principal fluida para o formulário, centralizada e alinhada ao topo da sidebar.
- Garantir bom comportamento no mobile (empilhar: banners acima, formulário abaixo).
- Evitar deslocamentos causados pelo header do card (banner + logo absoluto).

## Diretrizes de layout (Tailwind)
- Container central com largura máxima controlada.
- Grid com colunas explícitas para evitar “saltos”:
  - Desktop: `grid-cols-[320px,1fr]`
  - Gap consistente: `gap-8`
- Sidebar sticky: `md:sticky md:top-24`
- Remover margens desnecessárias que empurram o card.
- Garantir que o header com logo absoluto não cause sobreposição: compensar com `pt-12` adequado (ou ajustar o offset do logo).

## Alterações solicitadas no arquivo `CompanyReviewPage.tsx`

1) Substituir a marcação do container e grid:
- Trocar o wrapper por:
```tsx
<div className="min-h-screen bg-gray-50 py-10">
  <div className="mx-auto w-full max-w-6xl px-4">
    <div className="grid grid-cols-1 md:[grid-template-columns:320px_1fr] gap-8 items-start">
      {/* Sidebar esquerda */}
      <aside className="order-1 md:order-none md:sticky md:top-24">
        <SidebarBanners slug={slug} />
      </aside>

      {/* Coluna principal */}
      <section className="w-full">
        {/* Card do formulário permanece aqui */}
      </section>
    </div>
  </div>
</div>
````

* Motivo: usar colunas explícitas impede que o navegador tente redistribuir a largura e “empurre” o card. `items-start` alinha topo com topo.

2. Ajustar o `CardHeader` para evitar deslocamento vertical do conteúdo:

* No bloco do banner/logo dentro do `CardHeader`, garantir que o “logo flutuante” não corte a área do título:

  * Se usar `-bottom-8` no logo, garanta `pt-12` (ou `pt-14`) suficiente no wrapper do título.
  * Alternativa: reduzir o offset do logo para `-bottom-6` e usar `pt-10`.
* Exemplo:

```tsx
<CardHeader className="relative overflow-hidden p-0">
  <div className="relative h-32">
    {/* background image + overlay */}
  </div>
  <div className="pt-12 px-6 pb-4 relative z-10">
    <CardTitle className="text-2xl font-bold text-gray-900">Avalie {company?.name ?? 'a Empresa'}</CardTitle>
    <CardDescription>Sua opinião é fundamental para a comunidade.</CardDescription>
  </div>
</CardHeader>
```

3. Garantir que o formulário ocupe a largura total da coluna principal:

* Manter o `Card` sem `max-w-3xl` internos quando houver grid pai.
* Evitar `mx-auto` dentro da coluna principal (pode recentralizar indevidamente).

4. Remover o `BannerSlider` do topo do card (já existe sidebar):

* Se necessário mantê-lo, restringir a outra posição (ex.: `position="company_review_header"`) sem quebrar a hierarquia visual do formulário.

5. Ajustes de responsividade:

* Mobile: manter `grid-cols-1` e ordenar `SidebarBanners` antes do formulário com `order-1`.
* Espaçamentos verticais consistentes: `py-10`, `gap-8`, `space-y-8` no form.

## Critérios de aceite

* Em desktop, a sidebar aparece à esquerda (320px) e o formulário à direita, ambos alinhados ao topo.
* Em mobile, os banners aparecem antes do formulário, empilhados corretamente.
* O card do formulário não “sangra” nem é empurrado lateralmente pelo grid.
* O header com logo não sobrepõe o título; o espaço superior está correto (sem saltos).
* Sem regressões de overflow horizontal.

## Snippet final (trecho aplicado no wrapper)

```tsx
<div className="min-h-screen bg-gray-50 py-10">
  <div className="mx-auto w-full max-w-6xl px-4">
    <div className="grid grid-cols-1 md:[grid-template-columns:320px_1fr] gap-8 items-start">
      <aside className="order-1 md:order-none md:sticky md:top-24">
        <SidebarBanners slug={slug} />
      </aside>
      <section className="w-full">
        {/* <Card> ... formulário existente ... </Card> */}
      </section>
    </div>
  </div>
</div>
```




```
```
