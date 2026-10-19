import { useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import type { ProjectItem } from '../types';
import { ScrollReveal } from './ScrollReveal';
import { createPortfolioPlayback } from './portfolio-playback';

interface ProjectsSectionProps {
  onImageClick?: (imageSrc: string, title: string, codeSnippet?: string) => void;
  onSelectProject?: (project: ProjectItem) => void;
}

export function ProjectsSection(_props: ProjectsSectionProps) {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: 'center', duration: 30 });
  const sectionRef = useRef<HTMLElement>(null);
  const playbackRef = useRef<ReturnType<typeof createPortfolioPlayback> | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!api || !section) return;
    const player = createPortfolioPlayback(() => api.scrollNext());
    playbackRef.current = player;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onSelect = () => setActive(api.selectedScrollSnap());
    const onVisibility = () => player.pause('hidden', document.hidden);
    const onMotion = () => {
      player.pause('reduced', reduced.matches);
      api.reInit({ duration: reduced.matches ? 0 : 30 });
    };
    const onPointerDown = () => player.pause('drag', true);
    const onPointerUp = () => player.pause('drag', false);
    player.pause('outside', true);
    const observer = new IntersectionObserver(([entry]) => {
      player.pause('outside', !entry?.isIntersecting);
    }, { threshold: 0.25 });
    observer.observe(section);
    api.on('select', onSelect).on('reInit', onSelect).on('pointerDown', onPointerDown).on('pointerUp', onPointerUp);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onMotion);
    onVisibility(); onMotion(); onSelect();
    return () => {
      player.destroy(); playbackRef.current = null; observer.disconnect();
      api.off('select', onSelect).off('reInit', onSelect).off('pointerDown', onPointerDown).off('pointerUp', onPointerUp);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', onMotion);
    };
  }, [api]);

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') api?.scrollPrev(); else api?.scrollNext();
    playbackRef.current?.reset();
  };

  return (
    <section id="projetos" ref={sectionRef} className="portfolio-section relative py-24 sm:py-32" aria-labelledby="projetos-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <span className="mb-3 block font-mono text-xs font-semibold text-brand-bright sm:text-sm">02 // PROJETOS SELECIONADOS</span>
            <h2 id="projetos-title" className="text-3xl font-bold text-copy sm:text-4xl lg:text-5xl">Projetos</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-copy-muted">Conheça alguns projetos que desenvolvemos para transformar marcas em experiências digitais.</p>
          </header>
        </ScrollReveal>
        <div
          className="portfolio-carousel relative"
          role="region" aria-roledescription="carrossel" aria-label="Sites desenvolvidos pela Gomes Studio"
          onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) playbackRef.current?.pause('hover', true); }}
          onMouseLeave={() => playbackRef.current?.pause('hover', false)}
          onFocusCapture={() => playbackRef.current?.pause('focus', true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) playbackRef.current?.pause('focus', false); }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault(); navigate(event.key === 'ArrowLeft' ? 'prev' : 'next');
            }
          }}
        >
          <div className="portfolio-viewport" ref={viewportRef}>
            <div className="portfolio-track">
              {PORTFOLIO_PROJECTS.map((project, index) => (
                <div key={project.id} className="portfolio-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${PORTFOLIO_PROJECTS.length}`} data-active={active === index}>
                  <a className="portfolio-project group block" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar projeto ${project.name}`}>
                    <div className="portfolio-image-frame relative aspect-video overflow-hidden rounded-lg border border-copy/15 bg-ink">
                      <img src={project.image} alt={`Página inicial do site ${project.name}`} width={1920} height={1080} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      <span className="portfolio-image-overlay absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3 text-xs font-medium text-copy" aria-hidden="true">
                        <span>Visitar projeto</span><ArrowUpRight className="size-4 shrink-0" />
                      </span>
                    </div>
                    <div className="flex min-h-20 items-start justify-between gap-3 px-1 pt-5">
                      <h3 className="min-w-0 text-sm font-semibold leading-relaxed text-copy sm:text-base">{project.name}</h3>
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-brand-bright" aria-hidden="true" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="portfolio-arrow portfolio-arrow-prev action-glass" aria-label="Projeto anterior" title="Projeto anterior" onClick={() => navigate('prev')}><ArrowLeft /></Button>
          <Button variant="ghost" size="icon" className="portfolio-arrow portfolio-arrow-next action-glass" aria-label="Próximo projeto" title="Próximo projeto" onClick={() => navigate('next')}><ArrowRight /></Button>
          <div className="mt-4 flex h-11 items-center justify-center gap-5">
            <div className="flex items-center gap-2" aria-hidden="true">
              {PORTFOLIO_PROJECTS.map((project, index) => <span key={project.id} className="portfolio-marker" data-active={index === active} />)}
            </div>
            <Button variant="ghost" size="icon" className="text-copy-muted hover:bg-copy/5 hover:text-copy" aria-label={paused ? 'Retomar reprodução automática' : 'Pausar reprodução automática'} title={paused ? 'Retomar reprodução automática' : 'Pausar reprodução automática'} aria-pressed={paused} onClick={() => { playbackRef.current?.pause('user', !paused); setPaused(!paused); }}>{paused ? <Play /> : <Pause />}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
