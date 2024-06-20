Next.js project for Peerbubble social media platform

## Getting Started

1. Clone this repo
2. Run `npm install` to install all NPM packages.
3. Run `npx prisma migrate dev` and enter a migration message to build database migration files.
4. Run `npx prisma generate` to generate Prisma metadata.
5. Run `npx prisma studio` to open the Prisma Studio interface. Confirm that all models that are defined in the `prisma/schema.prisma` file are present.
6. Run `npm run dev` to start the server, and navigate to http://localhost:3000

## Installed packages

The following NPM packages are required dependencies:

- `@prisma/client`: The client package needed to communicate with the Prisma server
- `react-icons`: A collection of icon libraries
- `zustand`: A state management library similar to Redux and React Csontext API

## Important files and folders

- `app/*`: In Next.js 13+, the app folder is the main folder in which pages, API routes, styles, and other page components are kept. Read more about the new app directory approach ("App Router") at https://nextjs.org/docs/app.
- `app/api`: This folder stores all API route handlers (https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- `app/components`: Contains any React/Next.js components (e.g. header, footer, button) that is a part of a page.s
- `app/page.jsx`: The home page
- `app/layout.jsx`: The layout component for the entire application. Top-level styling and functionality can be placed here.
- `app/globals.css`: Main styling file, put all Tailwind CSS styles here
- `lib/prisma.js`: Initializes the Prisma client.
- `lib/zustand.js`: The zustand store file where you can define all Zustand hooks

## Environemnt variables

Ask admin for the .env file configurations.
