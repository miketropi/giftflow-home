import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import { Calendar, ArrowLeft, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import MermaidInit from './MermaidInit';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? '';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    ...(siteUrl
      ? { alternates: { canonical: `${siteUrl}/blog/${slug}` } }
      : {}),
  };
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function readingMinutesFromHtml(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const readMins = readingMinutesFromHtml(post.content);

  const otherSlugs = getAllPostSlugs().filter((s) => s !== slug);
  const otherPosts = await Promise.all(otherSlugs.map(getPostBySlug));
  const related = otherPosts
    .sort((a, b) => {
      const da = a.date ? new Date(a.date) : new Date(0);
      const db = b.date ? new Date(b.date) : new Date(0);
      return db - da;
    })
    .slice(0, 5);

  const sidebar = (
    <div className="space-y-6 rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-lg shadow-zinc-200/45 backdrop-blur-sm sm:p-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        All articles
      </Link>
      <div className="border-t border-zinc-200/80 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Keep reading
        </p>
        <ul className="mt-4 space-y-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex gap-3 rounded-xl py-1 text-sm leading-snug text-zinc-600 transition-colors hover:text-zinc-900"
              >
                <ArrowUpRight
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                  aria-hidden
                />
                <span className="line-clamp-2">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-zinc-200/80 pt-6">
        <p className="text-xs leading-relaxed text-zinc-600">
          Need help applying this to your site?{' '}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            Message the team
          </Link>
          .
        </p>
      </div>
      <div className="border-t border-zinc-200/80 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Giftflow Pro</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Subscriptions, exports, and scale on the same WordPress install.
        </p>
        <Link
          href="/pro"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-orange-600"
        >
          See Pro
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-orange-50/45 via-white to-amber-50/40 text-zinc-900">
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_50%_-15%,rgba(255,122,0,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 via-white to-amber-50/25" />
        <div className="absolute right-0 top-40 h-[28rem] w-[28rem] translate-x-1/3 rounded-full bg-primary/12 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/4 rounded-full bg-orange-400/18 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2318181b' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Masthead */}
        <header className="border-b border-zinc-200/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
            <nav
              className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-600 sm:mb-12"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="transition-colors hover:text-zinc-900">
                Home
              </Link>
              <span className="text-zinc-400" aria-hidden>
                /
              </span>
              <Link href="/blog" className="transition-colors hover:text-zinc-900">
                Articles
              </Link>
              <span className="text-zinc-400" aria-hidden>
                /
              </span>
              <span className="line-clamp-1 max-w-[min(100%,12rem)] text-zinc-500 sm:max-w-lg">
                {post.title}
              </span>
            </nav>

            <div className="max-w-4xl">
              <h1 className="font-yeseva-one text-[2.1rem] font-normal leading-[1.12] text-zinc-900 sm:text-4xl sm:leading-[1.1] lg:text-[2.85rem] lg:leading-[1.08]">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-8 text-lg leading-relaxed text-zinc-600 sm:text-xl sm:leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
                {post.date && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm">
                    <Calendar className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                )}
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm">
                  <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{readMins} min read</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Article + sidebar */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <div className="order-1 lg:col-span-8">
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xl shadow-zinc-200/50">
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  aria-hidden
                />
                <div className="border-b border-zinc-200/90 bg-gradient-to-r from-zinc-50 to-zinc-100/80 px-6 py-6 sm:px-10 sm:py-7 lg:px-12 lg:py-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Article
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-[0.9375rem]">
                    Long-form notes from the Giftflow team—technical detail, diagrams, and copy-paste snippets
                    where it helps.
                  </p>
                </div>
                <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 xl:px-14 xl:py-20">
                  <MermaidInit />
                  <article
                    className="markdown-body mx-auto max-w-3xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>

              <footer className="mt-10 flex flex-col gap-6 rounded-2xl border border-zinc-200/90 bg-white px-6 py-8 shadow-md shadow-zinc-200/40 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10 lg:mt-14">
                <p className="max-w-md text-sm leading-relaxed text-zinc-600">
                  Was this useful? We publish alongside product updates—bookmark{' '}
                  <Link href="/blog" className="font-medium text-primary hover:underline">
                    Articles
                  </Link>{' '}
                  for what is new.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    All articles
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
                  >
                    Get in touch
                  </Link>
                </div>
              </footer>
            </div>

            <aside className="order-2 lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--giftflow-header-stack)+1.5rem)]">
                {sidebar}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
