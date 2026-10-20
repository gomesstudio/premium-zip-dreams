/// <reference types="bun" />
import { describe, expect, test } from 'bun:test';
import { createPortfolioPlayback } from './portfolio-playback';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';

function fixture() {
  let now = 0;
  let count = 0;
  let serial = 0;
  const jobs = new Map<number, { at: number; fn: () => void }>();
  const clock = {
    set(fn: () => void, ms: number) { const id = ++serial; jobs.set(id, { at: now + ms, fn }); return id as unknown as ReturnType<typeof setTimeout>; },
    clear(id: ReturnType<typeof setTimeout>) { jobs.delete(id as unknown as number); },
  };
  const player = createPortfolioPlayback(() => count++, clock);
  const tick = (ms: number) => {
    const end = now + ms;
    while (true) {
      const next = [...jobs.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      if (!next || next[1].at > end) break;
      now = next[1].at; jobs.delete(next[0]); next[1].fn();
    }
    now = end;
  };
  return { player, tick, count: () => count, jobs };
}

describe('Portfolio playback rules', () => {
  test('advances every 2000ms, not before', () => {
    const f = fixture(); f.player.reset(); f.tick(1999); expect(f.count()).toBe(0);
    f.tick(1); expect(f.count()).toBe(1); f.tick(2000); expect(f.count()).toBe(2);
  });
  test('manual interaction restarts the full interval', () => {
    const f = fixture(); f.player.reset(); f.tick(1900); f.player.reset();
    f.tick(1999); expect(f.count()).toBe(0); f.tick(1); expect(f.count()).toBe(1);
  });
  for (const reason of ['hover', 'hidden', 'reduced', 'focus', 'drag', 'outside']) {
    test(`pauses for ${reason} and resumes with a fresh interval`, () => {
      const f = fixture(); f.player.reset(); f.player.pause(reason, true); f.tick(5000); expect(f.count()).toBe(0);
      f.player.pause(reason, false); f.tick(2000); expect(f.count()).toBe(1);
    });
  }
  test('one pause cannot override another; disposal clears timers', () => {
    const f = fixture(); f.player.pause('hover', true); f.player.pause('hidden', true);
    f.player.pause('hover', false); f.tick(5000); expect(f.count()).toBe(0);
    f.player.pause('hidden', false); expect(f.jobs.size).toBe(1);
    f.player.reset(); expect(f.jobs.size).toBe(1); f.player.destroy(); f.tick(5000); expect(f.count()).toBe(0);
  });
  test('retains all five exact official URLs in the specified order', () => {
    expect(PORTFOLIO_PROJECTS.map(p => p.url)).toEqual([
      'https://efraimfitness.gomes-studio.workers.dev/',
      'https://jcell.gomes-studio.workers.dev/',
      'https://essencia-store-boutique.gomes-studio.workers.dev/',
      'https://doce-desejo-confeitaria-artesanal.ai.studio/',
      'https://smartgym.gomes-studio.workers.dev/',
    ]);
  });
});