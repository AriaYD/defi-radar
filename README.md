# DeFi Radar

Read-only, multi-chain DeFi asset monitoring MCP server for Claude Code / OpenClaw.

**Core principles**: Read-only (no private keys, no signing, no transactions), multi-chain, zero-trust (API keys stay local).

## Features (Phase 1)

- **Wallet Balances** — ETH + ERC-20 token balances across Ethereum, Arbitrum, Base
- **Aave V3 Health** — Monitor health factor, collateral, debt, liquidation risk
- **Uniswap V3 LP** — Track LP positions, in-range / out-of-range status
- **Portfolio Summary** — Combined overview of all positions
- **Alerts** — Health factor warnings when positions approach liquidation

## Quick Start

### 1. Install

```bash
npm install -g defi-radar
# or
clawhub install defi-radar
```

### 2. Configure

```bash
mkdir -p ~/.defi-radar
cat > ~/.defi-radar/config.json << 'EOF'
{
  "wallets": [
    {
      "label": "My Wallet",
      "address": "0xYOUR_WALLET_ADDRESS",
      "chains": ["ethereum", "arbitrum", "base"]
    }
  ],
  "chains": {
    "ethereum": { "rpcUrl": "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY" },
    "arbitrum": { "rpcUrl": "https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY" },
    "base": { "rpcUrl": "https://base-mainnet.g.alchemy.com/v2/YOUR_KEY" }
  },
  "alerts": {
    "aaveHealthFactorThreshold": 1.5
  }
}
EOF
```

Get a free Alchemy API key at [alchemy.com](https://www.alchemy.com/).

### 3. Add to Claude Code

Add to your `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "defi-radar": {
      "command": "defi-radar"
    }
  }
}
```

Or for local development:

```json
{
  "mcpServers": {
    "defi-radar": {
      "command": "node",
      "args": ["/path/to/defi-radar/dist/index.js"]
    }
  }
}
```

### 4. Use

Talk to Claude naturally:

- "Show my wallet balances"
- "Is my Aave position safe?"
- "Are my Uniswap LP positions in range?"
- "Give me a portfolio overview"
- "Check for any DeFi alerts"

## MCP Tools

| Tool | Description |
|------|-------------|
| `get_wallet_balances` | ETH + ERC-20 balances with USD prices |
| `get_aave_health` | Aave V3 health factor and position details |
| `get_uniswap_positions` | Uniswap V3 LP positions and range status |
| `get_portfolio_summary` | Combined portfolio overview |
| `check_alerts` | Risk alerts and warnings |

## Configuration

Config file: `~/.defi-radar/config.json`

| Field | Required | Description |
|-------|----------|-------------|
| `wallets` | Yes | Array of wallet addresses to monitor |
| `chains` | No | Custom RPC URLs (falls back to public RPCs) |
| `coingecko.apiKey` | No | CoinGecko API key (free tier works without) |
| `alerts.aaveHealthFactorThreshold` | No | Health factor alert threshold (default: 1.5) |
| `tokens` | No | Custom token lists per chain |

## Development

```bash
git clone https://github.com/duanyytop/defi-radar.git
cd defi-radar
npm install
npm run dev
```

```bash
npm run build      # Compile TypeScript
npm run typecheck   # Type check without emitting
npm test           # Run tests
```

## Security

- **No private keys** — This tool only reads public blockchain data
- **No transactions** — Cannot sign or send any transactions
- **Local config** — API keys stored in `~/.defi-radar/`, never transmitted
- **Open source** — All code is auditable

## License

MIT
