import { describe, it, expect, afterEach } from 'vitest';
import { ConfigSchema } from '../types.js';
import { loadConfig } from '../config.js';

describe('ConfigSchema', () => {
  it('validates empty config', () => {
    const result = ConfigSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('accepts coingecko key', () => {
    const result = ConfigSchema.safeParse({ coingecko: { apiKey: 'test' } });
    expect(result.success).toBe(true);
  });

  it('accepts config without coingecko', () => {
    const result = ConfigSchema.parse({});
    expect(result.coingecko).toBeUndefined();
  });
});

describe('loadConfig from env', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('picks up COINGECKO_API_KEY from env', () => {
    process.env = { ...originalEnv, COINGECKO_API_KEY: 'cg-test' };
    const config = loadConfig();
    expect(config.coingecko?.apiKey).toBe('cg-test');
  });

  it('returns empty config when no env or file', () => {
    process.env = { ...originalEnv };
    delete process.env.COINGECKO_API_KEY;
    // loadConfig falls back to empty config if no file exists
    const config = loadConfig();
    expect(config).toBeDefined();
  });
});
