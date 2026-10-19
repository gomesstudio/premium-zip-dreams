import efraim from '@/assets/projects/efraim-fitness-home.jpg.asset.json';
import jcell from '@/assets/projects/jcell-home.jpg.asset.json';
import essencia from '@/assets/projects/essencia-store-home.jpg.asset.json';
import doce from '@/assets/projects/doce-desejo-home.jpg.asset.json';
import smartgym from '@/assets/projects/smartgym-home.jpg.asset.json';

export const PORTFOLIO_PROJECTS = [
  { id: 'efraim-fitness', name: 'Efraim Fitness', url: 'https://efraimfitness.gomes-studio.workers.dev/', image: efraim.url },
  { id: 'jcell', name: "J'Cell", url: 'https://jcell.gomes-studio.workers.dev/', image: jcell.url },
  { id: 'essencia-store', name: 'Essência Store Boutique', url: 'https://essencia-store-boutique.gomes-studio.workers.dev/', image: essencia.url },
  { id: 'doce-desejo', name: 'Doce Desejo Confeitaria Artesanal', url: 'https://doce-desejo-confeitaria-artesanal.ai.studio/', image: doce.url },
  { id: 'smartgym', name: 'SmartGym', url: 'https://smartgym.gomes-studio.workers.dev/', image: smartgym.url },
] as const;