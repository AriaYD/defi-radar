import { createPublicClient, http, type PublicClient } from 'viem';
import { mainnet, arbitrum, base } from 'viem/chains';
import type { ChainName, DefiRadarConfig } from '../types.js';
import { DEFAULT_RPC_URLS } from './constants.js';

const CHAIN_MAP = {
  ethereum: mainnet,
  arbitrum: arbitrum,
  base: base,
} as const;

const clients = new Map<ChainName, PublicClient>();

export function getClient(chain: ChainName, config?: DefiRadarConfig): PublicClient {
  const cached = clients.get(chain);
  if (cached) return cached;

  const rpcUrl = config?.chains?.[chain]?.rpcUrl ?? DEFAULT_RPC_URLS[chain];
  const client = createPublicClient({
    chain: CHAIN_MAP[chain],
    transport: http(rpcUrl),
    batch: {
      multicall: true,
    },
  });

  clients.set(chain, client as PublicClient);
  return client as PublicClient;
}

export function clearClients(): void {
  clients.clear();
}
