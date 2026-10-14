import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  ShoppingBag,
  Dumbbell,
  BedDouble,
  Scissors,
  UtensilsCrossed,
  PartyPopper,
  Stethoscope,
  Palette,
  ImageIcon,
  Film,
  PenTool,
  Globe,
  Server,
  Smartphone,
  MessageCircle,
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const SEGMENTS = [
  { icon: ShoppingBag, title: 'Lojas e varejo', text: 'Produtos, ofertas e catálogo.' },
  { icon: Dumbbell, title: 'Academias e fitness', text: 'Modalidades, planos e estrutura.' },
  { icon: BedDouble, title: 'Hotéis e pousadas', text: 'Acomodações, fotos e localização.' },
  { icon: Scissors, title: 'Salões de beleza', text: 'Serviços, resultados e agendamentos por contato.' },
  { icon: UtensilsCrossed, title: 'Restaurantes', text: 'Cardápios digitais e pedidos pelo WhatsApp.' },
  { icon: PartyPopper, title: 'Eventos e promoções', text: 'Divulgação de campanhas e eventos.' },
  {
    icon: Stethoscope,
    title: 'Profissionais e serviços',
    text: 'Médicos, dentistas, mecânicos, artistas, personal trainers e outros.',
  },
];

const PLANS = [
  {
    key: 'Plano Essencial',
    name: 'Essencial',
    price: '490',
    description: 'Para apresentar seu negócio de forma profissional.',
    items: ['Site com até 4 seções', 'Design para celular e computador', 'Botões de WhatsApp e redes sociais'],
    details: [
      'Apresentação da empresa e dos serviços',
      'Inserção de fotos e imagens fornecidas pelo cliente',
      'Publicação do site na internet',
    ],
    cta: 'Escolher Essencial',
    featured: false,
  },
  {
    key: 'Plano Profissional',
    name: 'Profissional',
    price: '690',
    description: 'Mais espaço para destacar seus serviços e diferenciais.',
    items: ['Tudo do plano Essencial', 'Site com até 7 seções', 'Galeria de fotos'],
    details: [
      'Possibilidade de inserir vídeos fornecidos pelo cliente',
      'Localização com Google Maps e botão “Como chegar”',
      'Seções para serviços, produtos ou depoimentos',
      'Personalização visual ampliada',
    ],
    cta: 'Escolher Profissional',
    featured: true,
  },
  {
    key: 'Plano Premium',
    name: 'Premium',
    price: '890',
    description: 'Uma apresentação mais completa e personalizada.',
    items: ['Tudo do plano Profissional', 'Site com até 10 seções', 'Design mais personalizado'],
    details: [
      'Catálogo visual de produtos ou serviços',
      'Carrinho de seleção com envio dos itens para o WhatsApp (sujeito à avaliação do projeto, sem pagamento integrado)',
      'Mais espaço para campanhas e chamadas para ação',
      'Organização personalizada do conteúdo',
    ],
    cta: 'Escolher Premium',
    featured: false,
  },
];

const EXTRAS = [
  { icon: Palette, title: 'Criação de arte comercial', price: 'R$ 50,00', unit: 'por arte' },
  { icon: ImageIcon, title: 'Melhoria básica de imagem', price: 'R$ 30,00', unit: 'por imagem' },
  { icon: Film, title: 'Edição simples de vídeo', price: 'R$ 50,00', unit: 'por vídeo' },
  { icon: PenTool, title: 'Criação visual básica de identidade', price: 'R$ 100,00', unit: 'valor único' },
];

const MAINTENANCE = [
  { name: 'Essencial', price: '59,90', basic: 3, advanced: 1 },
  { name: 'Premium', price: '79,90', basic: 5, advanced: 2 },
  { name: 'Exclusivo', price: '99,90', basic: 8, advanced: 3 },
];

const INCLUDED = [
  { icon: Globe, text: 'Criação e publicação do site' },
  { icon: Server, text: 'Hospedagem gratuita na estrutura da Gomes Studio' },
  { icon: Smartphone, text: 'Design responsivo' },
  { icon: MessageCircle, text: 'Botões de contato e redes sociais, conforme o plano' },
];

const eyebrow = 'font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#38BDF8] uppercase mb-3 block';
const card =
  'rounded-2xl border border-white/10 bg-[#101420]/75 backdrop-blur-md transition-all duration-300 hover:border-[#38BDF8]/50 motion-reduce:transition-none';

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [openPlan, setOpenPlan] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);

  const goToContact = (serviceKey: string) => {
    onSelectService(serviceKey);
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servicos" className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-4 sm:gap-28 sm:px-6 lg:px-8">
        {/* BLOCO 1 — APRESENTAÇÃO */}
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className={eyebrow}>03 // SERVIÇOS</span>
            <h2 id="servicos-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Sites que valorizam o seu negócio.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              Criamos sites personalizados para apresentar sua empresa, destacar seus serviços e facilitar o contato
              com seus clientes.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href="#planos"
                className="action-glass action-glass-primary inline-flex min-h-12 items-center justify-center gap-2 px-6 text-xs font-mono font-semibold uppercase tracking-wider"
              >
                Conhecer os planos <ArrowDown className="action-glass-icon h-4 w-4" />
              </a>
              <a
                href="#contato"
                className="action-glass action-glass-secondary inline-flex min-h-12 items-center justify-center gap-2 px-6 text-xs font-mono font-semibold uppercase tracking-wider"
              >
                Solicitar orçamento <ArrowRight className="action-glass-icon h-4 w-4" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* BLOCO 2 — TIPOS DE SITES */}
        <div>
          <ScrollReveal>
            <div className="mb-10 text-center sm:text-left">
              <span className={eyebrow}>TIPOS DE SITES</span>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Para cada tipo de negócio.</h3>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.04} yOffset={16} className="h-full">
                <div className={`${card} group flex h-full items-start gap-4 p-5 active:border-[#38BDF8]/50`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#38BDF8]/25 bg-[#0066FF]/10 text-[#38BDF8]">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white transition-colors group-hover:text-[#38BDF8]">{s.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-[#94A3B8]">{s.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* BLOCO 3 — PLANOS */}
        <div id="planos" className="scroll-mt-24">
          <ScrollReveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className={eyebrow}>PLANOS DE CRIAÇÃO</span>
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Escolha o plano ideal.</h3>
              <p className="mt-4 text-sm text-[#94A3B8] sm:text-base">
                Pagamento único pela criação e publicação do site.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {PLANS.map((p, i) => {
              const open = openPlan === p.key;
              return (
                <ScrollReveal key={p.key} delay={i * 0.08} className="h-full">
                  <div
                    className={`${card} relative flex h-full flex-col p-6 sm:p-8 ${
                      p.featured
                        ? 'border-[#38BDF8]/45 shadow-[0_20px_60px_-25px_rgba(0,102,255,0.55)]'
                        : ''
                    }`}
                  >
                    {p.featured && (
                      <span className="absolute -top-3 left-6 rounded-full border border-[#38BDF8]/40 bg-[#05070A] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#38BDF8]">
                        Mais escolhido
                      </span>
                    )}
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#64748B]">
                      {p.name === 'Essencial'
                        ? 'SITE\u00a0ESSENCIAL'
                        : p.name === 'Profissional'
                          ? 'SITE\u00a0PROFISSIONAL'
                          : 'SITE PREMIUM'}
                    </span>
                    <div className="mt-4 flex items-baseline gap-1 text-white">
                      <span className="text-lg font-semibold text-[#94A3B8]">R$</span>
                      <span className="text-5xl font-bold tracking-tight">{p.price}</span>
                      <span className="text-lg font-semibold text-[#94A3B8]">,00</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">{p.description}</p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {p.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 text-sm text-[#E2E8F0]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" />
                          {it}
                        </li>
                      ))}
                      {open &&
                        p.details.map((it) => (
                          <li key={it} className="flex items-start gap-3 text-sm text-[#CBD5E1]">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" />
                            {it}
                          </li>
                        ))}
                    </ul>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenPlan(open ? null : p.key)}
                      className="mt-5 inline-flex items-center gap-1.5 self-start font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8] hover:text-white"
                    >
                      {open ? 'Ver menos' : 'Ver detalhes'}
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="mt-auto pt-8">
                      <button
                        type="button"
                        onClick={() => goToContact(p.key)}
                        className={`action-glass ${
                          p.featured ? 'action-glass-primary' : 'action-glass-secondary'
                        } inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 text-xs font-mono font-semibold uppercase tracking-wider`}
                      >
                        {p.cta} <ArrowRight className="action-glass-icon h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-[#64748B]">
            Os valores correspondem à criação e publicação do site. Produção de artes, tratamento avançado de imagens,
            edição de vídeos, identidade visual e funcionalidades complexas são orçados separadamente.
          </p>
        </div>

        {/* BLOCO 4 — ADICIONAIS */}
        <div>
          <ScrollReveal>
            <div className="mb-10 text-center sm:text-left">
              <span className={eyebrow}>SERVIÇOS ADICIONAIS</span>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Precisa de materiais visuais?</h3>
              <p className="mt-3 text-sm text-[#94A3B8] sm:text-base">Personalize seu projeto com serviços adicionais.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXTRAS.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 0.05} yOffset={16} className="h-full">
                <button
                  type="button"
                  onClick={() => goToContact('Serviços adicionais')}
                  className={`${card} flex h-full w-full flex-col items-start p-5 text-left`}
                >
                  <e.icon className="h-5 w-5 text-[#38BDF8]" />
                  <h4 className="mt-4 text-sm font-bold text-white">{e.title}</h4>
                  <p className="mt-3 text-xl font-bold text-white">
                    {e.price} <span className="text-xs font-medium text-[#64748B]">{e.unit}</span>
                  </p>
                </button>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[#64748B]">
            Valores para serviços básicos, dentro de um escopo previamente combinado. Os valores podem variar conforme a
            complexidade do material, a qualidade dos arquivos fornecidos e o trabalho necessário. Qualquer valor
            adicional será informado e aprovado antes da execução.
          </p>
        </div>

        {/* BLOCO 5 — MANUTENÇÃO */}
        <div>
          <ScrollReveal>
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className={eyebrow}>MANUTENÇÃO MENSAL • OPCIONAL</span>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Seu site cuidado depois da publicação.
              </h3>
              <p className="mt-3 text-sm text-[#94A3B8] sm:text-base">
                Planos opcionais para manutenção, funcionamento e alterações no site.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {MAINTENANCE.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.06} className="h-full">
                <div className={`${card} flex h-full flex-col p-6`}>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#64748B]">{m.name}</span>
                  <p className="mt-3 text-white">
                    <span className="text-3xl font-bold">R$ {m.price}</span>
                    <span className="text-sm text-[#94A3B8]">/mês</span>
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[#E2E8F0]">
                    {[
                      'Manutenção da hospedagem e do funcionamento do site',
                      `Até ${m.basic} alterações básicas por mês`,
                      `Até ${m.advanced} ${m.advanced === 1 ? 'alteração avançada' : 'alterações avançadas'} por mês`,
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <button
                      type="button"
                      onClick={() => goToContact('Manutenção mensal')}
                      className="action-glass action-glass-secondary inline-flex min-h-11 w-full items-center justify-center gap-2 px-5 text-xs font-mono font-semibold uppercase tracking-wider"
                    >
                      Quero este plano <ArrowRight className="action-glass-icon h-4 w-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className={`${card} mt-6 p-5 hover:border-white/10`}>
            <button
              type="button"
              aria-expanded={showRules}
              onClick={() => setShowRules(!showRules)}
              className="flex w-full items-center justify-between gap-4 text-left font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]"
            >
              O que conta como alteração?
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${showRules ? 'rotate-180' : ''}`} />
            </button>
            {showRules && (
              <div className="mt-5 grid grid-cols-1 gap-6 text-sm text-[#94A3B8] sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-bold text-white">Alterações básicas</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Troca de textos</li>
                    <li>Substituição de imagens fornecidas pelo cliente</li>
                    <li>Atualização de telefone, endereço ou horários</li>
                    <li>Atualização de links existentes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-white">Alterações avançadas</h4>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Modificação de layout de uma seção existente</li>
                    <li>Reorganização de elementos</li>
                    <li>Inclusão de uma seção simples, mediante avaliação</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#64748B]">
            As alterações são mensais, não acumulativas e realizadas mediante solicitação, respeitando o escopo
            contratado. O prazo de execução é combinado conforme a solicitação. Criação de artes, edição de vídeos,
            novas funcionalidades e reformulações extensas são cobradas separadamente.
          </p>
        </div>

        {/* HOSPEDAGEM E PUBLICAÇÃO */}
        <ScrollReveal>
          <div className="rounded-2xl border border-[#38BDF8]/20 bg-[#0066FF]/[0.06] p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {INCLUDED.map((it) => (
                <div key={it.text} className="flex items-start gap-3 text-sm text-[#E2E8F0]">
                  <it.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#38BDF8]" />
                  {it.text}
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-[#94A3B8]">
              A criação e publicação são cobradas uma única vez; a manutenção mensal é opcional. A hospedagem utiliza a
              estrutura e o endereço disponibilizados pela Gomes Studio, conforme as condições do serviço. Domínio
              exclusivo e eventuais custos de renovação são combinados separadamente.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
