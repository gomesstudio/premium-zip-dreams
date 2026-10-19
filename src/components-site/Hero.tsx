import React from "react";
import { ArrowUpRight, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/5533991031052?text=Ol%C3%A1%20Lucas!%20Vim%20pelo%20site%20da%20Gomes%20Studio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";

interface HeroProps {
  onImageClick: (imageSrc: string, title: string, codeSnippet?: string) => void;
}

const LOGO_IMAGE = "/assets/brand/gomes-studio-logo.png";
const LOGO_VIDEO_MP4 = "/assets/brand/gomes-studio-logo-anim.mp4";
const LOGO_VIDEO_WEBM = "/assets/brand/gomes-studio-logo-anim.webm";

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="inicio"
      className="hero-premium relative flex min-h-[calc(100svh-3rem)] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      <div className="hero-tech-field pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="hero-tech-cross hero-tech-cross-a" />
        <span className="hero-tech-cross hero-tech-cross-b" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col items-center py-12 text-center sm:py-16">
          <p className="hero-kicker hero-intro-kicker mb-6 font-mono text-[10px] font-semibold uppercase sm:mb-8 sm:text-xs">
            <span aria-hidden="true" />
            GOMES STUDIO · EXPERIÊNCIAS DIGITAIS
          </p>

          <h1
            id="hero-title"
            className="hero-title hero-intro-title mx-auto w-full text-center text-4xl font-extrabold leading-[1.12] sm:text-5xl lg:text-7xl"
          >
            <span>Sua marca. Sua presença. </span>
            <span className="hero-title-accent">Seu próximo nível.</span>
          </h1>

          <p
            id="hero-subtitle"
            className="hero-subtitle mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed sm:mt-7 sm:text-lg lg:text-xl"
          >
            Elevamos a apresentação do seu negócio com sites modernos e experiências digitais que fortalecem sua marca e conectam você a novas oportunidades.
          </p>

          <div className="hero-intro-actions mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <Button asChild variant="ghost" className="hero-cta action-glass action-glass-primary group min-h-14 gap-3 px-7 text-sm font-semibold sm:px-8">
              <a id="hero-cta-solucoes" href="#projetos">
                <span>Conheça nossos projetos</span>
                <ArrowUpRight className="action-glass-icon transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="ghost" className="hero-cta action-glass group min-h-14 gap-3 px-7 text-sm font-semibold sm:px-8">
              <a id="hero-cta-contato" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="action-glass-icon" aria-hidden="true" />
                <span>Vamos conversar</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#video-apresentacao"
        className="hero-scroll-cue group relative z-10 mx-auto flex flex-col items-center gap-2 pb-8 font-mono text-[10px] font-medium uppercase tracking-[0.22em] sm:pb-10 sm:text-[11px]"
        aria-label="Rolar para o vídeo de apresentação"
      >
        <span>Explorar</span>
        <ChevronDown
          className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1"
          aria-hidden="true"
        />
      </a>
    </section>
  );
};

export const BrandFilm: React.FC<HeroProps> = () => {
  return (
    <section
      id="video-apresentacao"
      className="hero-premium hero-film relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="hero-tech-field pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="hero-tech-cross hero-tech-cross-b" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <p className="hero-kicker mb-6 font-mono text-[10px] font-semibold uppercase sm:mb-8 sm:text-xs">
          <span aria-hidden="true" />
          Apresentação da marca
        </p>

        <figure className="hero-brand-stage relative flex w-full flex-col items-center">
          <div className="hero-video-aura pointer-events-none absolute" aria-hidden="true" />
          <div
            className="hero-video-shell relative w-full"
            aria-label="Vídeo de apresentação da Gomes Studio"
          >
            <video
              poster={LOGO_IMAGE}
              playsInline
              preload="metadata"
              controls
              controlsList="nodownload"
              className="hero-video-media block h-full w-full object-contain"
              aria-label="Vídeo comercial de apresentação da logo Gomes Studio"
            >
              <source src={LOGO_VIDEO_MP4} type="video/mp4" />
              <source src={LOGO_VIDEO_WEBM} type="video/webm" />
              Seu navegador não suporta a reprodução deste vídeo.
            </video>
          </div>
          <figcaption className="hero-video-caption mt-3 text-center font-mono text-[10px] sm:text-xs">
            Vídeo comercial exemplo — apresentação de logo.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
