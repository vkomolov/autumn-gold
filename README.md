This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Architecture section:

## 🖼️ Image Handling Strategy

This project uses a hybrid image strategy that supports both optimized local images (via `StaticImageData`) and dynamic external sources (e.g., from a CMS or CDN).

For a detailed explanation, see [docs/image-strategy.md](./docs/image-strategy.md).

---

## Imager Wrapper Component: ImageWrapper

A small, battle-tested wrapper around Next.js `<Image>`
that guarantees safe layout (no CLS) and predictable responsive behavior

## For a detailed explanation, see [docs/imageWrapper.md](./docs/imageWrapper.md).

## все ссылки с октрытием нового окна через target="\_blank", должны иметь аттрибут rel="noopener"

Даже если ссылка не имеет target="\_blank", ссылка должна содержать аттрибут rel="noopener", предотвращающая
доступ к window.opener из нового окна (для избежания возможного шифинга и других атак)

---

## ✅ Node.js version control with .nvmrc

This project uses a .nvmrc file to enforce a required Node.js version.
The version is checked before running dev/build scripts using a script powered by semver.
How to use:
Make sure the current Node version corresponds to the version of Node.js,
written in .nvmrc

.nvmrc examples:

# Exact version

18.17.0

# Latest minor and patch for major version

^18.17.0

# Any version greater than or equal to 20

> =20

# Latest version of Node 24

^24.0.0
Scripts like npm run dev, build, and start will automatically check that your Node.js version matches what's required in .nvmrc. If not, they will exit with an error.
