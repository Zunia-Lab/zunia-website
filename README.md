<p align="center">
  <img src="https://raw.githubusercontent.com/Zunia-Lab/zunia-brand/main/png/icons/app/zunia-icon-256.png" alt="Zunia" width="96" />
</p>

# zunia-website

> Marketing site for Zunia at [zuniawallet.com](https://zuniawallet.com).

[![License](https://img.shields.io/github/license/Zunia-Lab/zunia-website)](LICENSE)
[![Website](https://img.shields.io/badge/website-zuniawallet.com-FF1B0C)](https://zuniawallet.com)

## Overview

Next.js site for product marketing, download CTAs, and developer links. Brand colors and typography follow [zunia-brand](https://github.com/Zunia-Lab/zunia-brand).

## Status

In development.

## Related repositories

| Repository | Description |
|------------|-------------|
| [zunia-docs](https://github.com/Zunia-Lab/zunia-docs) | Documentation (`docs.zuniawallet.com`) |
| [zunia-extension](https://github.com/Zunia-Lab/zunia-extension) | Browser extension |
| [zunia-mobile](https://github.com/Zunia-Lab/zunia-mobile) | Mobile wallet |
| [zunia-dashboard](https://github.com/Zunia-Lab/zunia-dashboard) | Web portfolio |
| [zunia-brand](https://github.com/Zunia-Lab/zunia-brand) | Brand assets |
| [zunia-ui](https://github.com/Zunia-Lab/zunia-ui) | Shared UI components |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run sync:chains` | Refresh chain names, logos and coverage counts from the chain registry |

### Chain data

The featured chain list, the logos in `public/chains` and the chain counts shown
on the page are generated from [zunia-chain-registry](https://github.com/Zunia-Lab/zunia-chain-registry)
into `src/content/chains.generated.ts`. Edit `FEATURED` in
`scripts/sync-chains.mjs` and re-run `npm run sync:chains`; the script needs a
checkout of the registry beside this repo, or `ZUNIA_CHAIN_REGISTRY` pointing at
one, and it fails rather than emit a chain the registry does not carry.

## Deployment

Deploy to Vercel and attach the custom domain `zuniawallet.com`. See [DEPLOY.md](../DEPLOY.md) in the workspace for DNS records.

```bash
# Example
vercel --prod
```

## Contributing

See [CONTRIBUTING.md](https://github.com/Zunia-Lab/.github/blob/main/CONTRIBUTING.md).

## Security

See [SECURITY.md](https://github.com/Zunia-Lab/.github/blob/main/SECURITY.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
