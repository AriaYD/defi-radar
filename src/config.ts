import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { ConfigSchema, type DefiRadarConfig } from './types.js';

const CONFIG_DIR = join(homedir(), '.defi-radar');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

export function getConfigPath(): string {
  return process.env.DEFI_RADAR_CONFIG ?? CONFIG_FILE;
}

export function loadConfig(): DefiRadarConfig {
  // Check env for CoinGecko key
  if (process.env.COINGECKO_API_KEY) {
    return ConfigSchema.parse({
      coingecko: { apiKey: process.env.COINGECKO_API_KEY },
    });
  }

  const configPath = getConfigPath();

  if (existsSync(configPath)) {
    const raw = readFileSync(configPath, 'utf-8');
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error(`Invalid JSON in ${configPath}`);
    }

    const result = ConfigSchema.safeParse(parsed);
    if (!result.success) {
      const issues = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
      throw new Error(`Invalid config in ${configPath}:\n${issues}`);
    }

    return result.data;
  }

  // No config needed — all APIs are free
  return ConfigSchema.parse({});
}
