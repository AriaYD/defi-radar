# DeFi Radar

Daily DeFi market intelligence report generator. Uses free public APIs (DeFiLlama + CoinGecko) to produce actionable reports for crypto investors.

Reports are automatically generated via GitHub Actions and posted as GitHub Issues at **8:00 AM Beijing time** daily.

## What's in the Report

| Section | Data Source | What It Tells You |
|---------|-----------|-------------------|
| **Market Overview** | CoinGecko | BTC/ETH prices, 24h change, total market cap |
| **Protocol TVL Changes** | DeFiLlama | Top 10 gainers and losers — where capital is flowing |
| **Stablecoin Supply** | DeFiLlama | USDT/USDC/DAI supply changes — new money entering or leaving |
| **DEX Trading Volume** | DeFiLlama | Top 10 DEXes by 24h volume — trading activity levels |
| **Market Signals** | Derived | Bullish/bearish signals based on above data |
| **Investment Considerations** | Derived | Actionable suggestions for investors |

## Setup

### Automated (GitHub Actions)

1. Fork or clone this repo
2. Create a `daily-report` label: `gh label create daily-report`
3. (Optional) Add `COINGECKO_API_KEY` to repo secrets for better rate limits
4. The workflow runs daily. Trigger manually: `Actions → Daily DeFi Report → Run workflow`

**No API keys required** — all data sources are free. CoinGecko key is optional for higher rate limits.

### Local Usage

```bash
pnpm install
pnpm report                    # Generate and save to ~/.defi-radar/reports/
pnpm report -- --stdout        # Print to terminal
pnpm report -- --locale zh     # Chinese report
```

## Configuration

Optional config file at `~/.defi-radar/config.json`:

```json
{
  "coingecko": {
    "apiKey": "YOUR_OPTIONAL_KEY"
  }
}
```

Or set `COINGECKO_API_KEY` environment variable.

## Development

```bash
git clone https://github.com/duanyytop/defi-radar.git
cd defi-radar
pnpm install
pnpm build        # Compile TypeScript
pnpm typecheck    # Type check
pnpm test         # Run tests
pnpm report       # Generate report locally
```

## License

MIT
