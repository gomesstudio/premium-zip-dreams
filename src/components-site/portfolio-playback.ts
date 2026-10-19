export const PROJECT_ADVANCE_MS = 2000;

/** One timer, reset after any interaction; pause reasons are independent. */
export function createPortfolioPlayback(
  advance: () => void,
  clock = { set: (fn: () => void, ms: number) => setTimeout(fn, ms), clear: (id: ReturnType<typeof setTimeout>) => clearTimeout(id) },
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let disposed = false;
  const pauses = new Set<string>();
  const clear = () => {
    if (timer !== undefined) clock.clear(timer);
    timer = undefined;
  };
  const reset = () => {
    clear();
    if (disposed || pauses.size) return;
    timer = clock.set(() => { timer = undefined; advance(); reset(); }, PROJECT_ADVANCE_MS);
  };
  return {
    reset,
    pause(reason: string, paused: boolean) { if (paused) pauses.add(reason); else pauses.delete(reason); reset(); },
    destroy() { disposed = true; clear(); },
  };
}