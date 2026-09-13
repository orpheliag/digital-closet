# Digital Closet

Digital Closet is a wardrobe-organizing app. Users can upload clothing photos, classify them as tops, bottoms, or shoes, and generate a random outfit from the items in their closet. Saved outfits and clothing items can be viewed from the account page.

This is my first project using [Next.js](https://nextjs.org) and [Supabase](https://supabase.com). I am building it to practice React, the Next.js App Router, Tailwind CSS, authentication, database queries, file storage, and row-level security.

## Current Stack

- [Next.js](https://nextjs.org) with the App Router
- [React](https://react.dev) and TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) Auth, PostgreSQL, and Storage

## Main Features

- Create an account and log in with Supabase Auth
- Upload clothing images and assign them to a category
- View personal clothing items in the closet
- Generate one random top, bottom, and pair of shoes
- Save generated outfits
- View saved outfits and closet items from the account page

## Project Structure

```text
app/
	page.tsx                # Homepage
	login/page.tsx          # Login route
	register/page.tsx       # Registration route
	closet/page.tsx         # Clothing upload route
	outfit/page.tsx         # Outfit generator route
	account/page.tsx        # Account route
components/               # Interactive React components
lib/                      # Supabase clients, queries, and shared types
public/                   # Static assets
```

## Getting Started

Install the dependencies:

```bash
npm install
```

Create a `.env.local` file at the project root and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Commands

Run the development server:

```bash
npm run dev
```

Check the project with ESLint:

```bash
npm run lint
```

Run the automated tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

## Supabase Setup

The database uses these main tables:

- `profiles` for application-specific user information
- `clothes` for uploaded clothing metadata
- `outfits` for saved outfit records
- `outfit_items` for the clothing items belonging to each outfit

The `clothes` table uses a fixed category to determine each outfit slot. The current generator requires one `top`, one `bottom`, and one `shoes` item.

Clothing images are stored in a Supabase Storage bucket, while their URLs and metadata are stored in the `clothes` table. Row-level security should remain enabled so users can access only their own data.

## Learning Notes

Because this is my first Next.js and Supabase project, the code intentionally keeps the main flows visible:

- pages define routes
- client components handle forms and browser interactions
- `lib/` contains database and authentication helpers
- Supabase Auth manages passwords and sessions
- RLS protects user-owned rows in the database

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
