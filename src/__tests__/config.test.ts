import { describe, it, expect } from 'vitest';
import { ConfigSchema } from '../types.js';

describe('ConfigSchema', () => {
  it('validates a minimal valid config', () => {
    const config = {
      wallets: [{ address: '0x1234567890abcdef1234567890abcdef12345678' }],
    };
    const result = ConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
  });

  it('rejects config with no wallets', () => {
    const result = ConfigSchema.safeParse({ wallets: [] });
    expect(result.success).toBe(false);
  });

  it('rejects invalid wallet address', () => {
    const result = ConfigSchema.safeParse({
      wallets: [{ address: 'not-an-address' }],
    });
    expect(result.success).toBe(false);
  });

  it('applies default chains to wallet', () => {
    const config = {
      wallets: [{ address: '0x1234567890abcdef1234567890abcdef12345678' }],
    };
    const result = ConfigSchema.parse(config);
    expect(result.wallets[0].chains).toEqual(['ethereum', 'arbitrum', 'base']);
  });

  it('applies default alert threshold', () => {
    const config = {
      wallets: [{ address: '0x1234567890abcdef1234567890abcdef12345678' }],
      alerts: {},
    };
    const result = ConfigSchema.parse(config);
    expect(result.alerts?.aaveHealthFactorThreshold).toBe(1.5);
  });

  it('accepts full config', () => {
    const config = {
      wallets: [
        {
          label: 'Main',
          address: '0x1234567890abcdef1234567890abcdef12345678',
          chains: ['ethereum', 'arbitrum'],
        },
      ],
      chains: {
        ethereum: { rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/key' },
      },
      coingecko: { apiKey: 'test-key' },
      alerts: { aaveHealthFactorThreshold: 2.0 },
      tokens: { ethereum: ['USDC', 'WETH'] },
    };
    const result = ConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
  });

  it('rejects invalid chain name', () => {
    const config = {
      wallets: [
        {
          address: '0x1234567890abcdef1234567890abcdef12345678',
          chains: ['solana'],
        },
      ],
    };
    const result = ConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });
});
