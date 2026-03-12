import { describe, it, expect } from 'vitest';
import { AAVE_V3_POOL, UNISWAP_V3_POSITION_MANAGER, KNOWN_TOKENS } from '../chains/constants.js';

describe('Chain Constants', () => {
  it('has Aave V3 Pool addresses for all chains', () => {
    expect(AAVE_V3_POOL.ethereum).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(AAVE_V3_POOL.arbitrum).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(AAVE_V3_POOL.base).toMatch(/^0x[a-fA-F0-9]{40}$/);
  });

  it('has Uniswap V3 Position Manager addresses for all chains', () => {
    expect(UNISWAP_V3_POSITION_MANAGER.ethereum).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(UNISWAP_V3_POSITION_MANAGER.arbitrum).toMatch(/^0x[a-fA-F0-9]{40}$/);
    expect(UNISWAP_V3_POSITION_MANAGER.base).toMatch(/^0x[a-fA-F0-9]{40}$/);
  });

  it('has USDC and WETH for all chains', () => {
    for (const chain of ['ethereum', 'arbitrum', 'base'] as const) {
      expect(KNOWN_TOKENS[chain].USDC).toMatch(/^0x[a-fA-F0-9]{40}$/);
      expect(KNOWN_TOKENS[chain].WETH).toMatch(/^0x[a-fA-F0-9]{40}$/);
    }
  });
});
