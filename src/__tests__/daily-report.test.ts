import { describe, it, expect } from 'vitest';
import { t } from '../report/i18n.js';

describe('daily-report i18n coverage', () => {
  it('all report section keys return non-empty strings', () => {
    const keys: Array<Parameters<typeof t>[0]> = [
      'reportTitle',
      'generatedAt',
      'sectionMarketOverview',
      'sectionTvlRankings',
      'sectionStablecoinSupply',
      'sectionDexVolume',
      'sectionMarketSignals',
      'sectionSuggestions',
      'totalMarketCap',
      'totalVolume',
      'change24h',
      'tvlGainers',
      'tvlLosers',
      'noTvlData',
      'supplyChange1d',
      'supplyChange7d',
      'noStablecoinData',
      'noDexData',
      'disclaimer',
    ];

    for (const key of keys) {
      expect(t(key, 'en').length).toBeGreaterThan(0);
      expect(t(key, 'zh').length).toBeGreaterThan(0);
    }
  });
});
