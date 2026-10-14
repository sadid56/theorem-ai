export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center font-sans">
      <main className="flex flex-col items-center gap-6 max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs text-neutral-600 dark:text-neutral-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Rove Monorepo
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Web Application Starter
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
          Welcome to your Next.js starter template styled with Tailwind CSS. Get
          started by editing{" "}
          <code className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 font-mono text-sm">
            src/app/page.tsx
          </code>
          .
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Documentation &rarr;
          </a>
          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Tailwind CSS
          </a>
        </div>
      </main>
    </div>
  );
}
