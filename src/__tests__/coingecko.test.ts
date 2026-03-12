import { describe, it, expect } from 'vitest';
import { resolveCoingeckoId, clearPriceCache } from '../pricing/coingecko.js';

describe('CoinGecko', () => {
  it('resolves known token symbols', () => {
    expect(resolveCoingeckoId('ETH')).toBe('ethereum');
    expect(resolveCoingeckoId('USDC')).toBe('usd-coin');
    expect(resolveCoingeckoId('WBTC')).toBe('wrapped-bitcoin');
    expect(resolveCoingeckoId('ARB')).toBe('arbitrum');
  });

  it('resolves case-insensitively', () => {
    expect(resolveCoingeckoId('eth')).toBe('ethereum');
    expect(resolveCoingeckoId('Usdc')).toBe('usd-coin');
    expect(resolveCoingeckoId('wbtc')).toBe('wrapped-bitcoin');
  });

  it('returns undefined for unknown tokens', () => {
    expect(resolveCoingeckoId('UNKNOWN_TOKEN_XYZ')).toBeUndefined();
  });

  it('clearPriceCache does not throw', () => {
    expect(() => clearPriceCache()).not.toThrow();
  });
});
