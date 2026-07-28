import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import {
  Calendar,
  Newspaper,
  ArrowUpRight,
  Sparkles,
  Library,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? '';

export async function generateMetadata() {
  return {
    title: 'Articles',
    description:
      'Guides and notes on the Giftflow WordPress plugin—donations, donors, campaigns, and operations.',
    openGraph: {
      title: 'Articles | Giftflow',
      description:
        'Guides and notes on the Giftflow WordPress plugin—donations, donors, campaigns, and operations.',
    },
    ...(siteUrl
      ? { alternates: { canonical: `${siteUrl}/blog` } }
      : {}),
  };
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

function formatShortDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogPage() {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));

  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB - dateA;
  });

  const [featured, ...rest] = sortedPosts;
  const count = sortedPosts.length;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-orange-50/45 via-white to-amber-50/40 text-zinc-900">
      {/* Layered backdrop */}
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,122,0,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 via-white to-amber-50/25" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2318181b' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute left-[10%] top-32 h-72 w-72 rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute bottom-20 right-[5%] h-96 w-96 rounded-full bg-orange-400/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="border-b border-zinc-200/80">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
          <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 shadow-sm backdrop-blur-sm">
                  <Newspaper className="h-4 w-4 text-primary" aria-hidden />
                  Giftflow journal
                </div>
                <h1 className="font-bricolage-grotesque font-bold text-[2.65rem] font-bold leading-[1.08] text-zinc-900 sm:text-5xl lg:text-6xl lg:leading-[1.06]">
                  Ideas for better{' '}
                  <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-300 bg-clip-text text-transparent">
                    fundraising
                  </span>{' '}
                  on WordPress
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-600 sm:text-xl sm:leading-relaxed">
                  Deep dives into campaigns, donors, gateways, and how the plugin fits your stack—written
                  for builders and operators, not buzzwords.
                </p>
                <ul className="mt-10 flex flex-col gap-4 text-sm text-zinc-600 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
                  <li className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Library className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="max-w-[14rem] leading-snug">Guides, architecture notes, and release context</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/90 bg-white text-zinc-600 shadow-sm">
                      <Sparkles className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="max-w-[14rem] leading-snug">Free core + Pro, same product story</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 shadow-xl shadow-zinc-200/50 backdrop-blur-sm sm:p-10">
                  <div
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
                    aria-hidden
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Library
                  </p>
                  <p className="mt-3 font-bricolage-grotesque font-bold text-4xl text-zinc-900 sm:text-5xl">{count}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {count === 1 ? 'article' : 'articles'} published
                  </p>
                  <div className="mt-8 space-y-3 border-t border-zinc-200/80 pt-8 text-sm text-zinc-600">
                    <p className="leading-relaxed">
                      New pieces ship with product updates and community questions—we keep them technical and
                      actionable.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-orange-600"
                    >
                      Suggest a topic
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured + grid */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          {sortedPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300/90 bg-white/80 px-8 py-24 text-center shadow-sm">
              <p className="text-lg text-zinc-600">No articles yet—check back soon.</p>
            </div>
          ) : (
            <>
              {featured && (
                <section className="mb-20 lg:mb-28" aria-labelledby="featured-heading">
                  <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div>
                      <p
                        id="featured-heading"
                        className="text-xs font-semibold uppercase tracking-[0.24em] text-primary"
                      >
                        Latest
                      </p>
                      <h2 className="mt-2 font-bricolage-grotesque font-bold text-2xl text-zinc-900 sm:text-3xl">
                        Featured article
                      </h2>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-zinc-600">
                      Our most recent long-form piece—start here if you are new to the blog.
                    </p>
                  </div>

                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group relative block overflow-hidden rounded-3xl border border-zinc-200/90 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 p-1 shadow-xl shadow-zinc-200/45 transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/10"
                  >
                    <div className="relative overflow-hidden rounded-[1.35rem] bg-white/90 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
                      <div
                        className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden
                      />
                      <div className="relative flex max-w-3xl flex-col gap-6">
                        {featured.date && (
                          <time
                            dateTime={featured.date}
                            className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
                          >
                            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden />
                            {formatDate(featured.date)}
                          </time>
                        )}
                        <h3 className="font-bricolage-grotesque font-bold text-3xl leading-tight text-zinc-900 transition-colors duration-200 group-hover:text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                          {featured.title}
                        </h3>
                        {featured.excerpt && (
                          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg sm:leading-relaxed">
                            {featured.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                          Read full article
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </section>
              )}

              {rest.length > 0 && (
                <section aria-labelledby="archive-heading">
                  <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                    <h2
                      id="archive-heading"
                      className="font-bricolage-grotesque font-bold text-2xl text-zinc-900 sm:text-3xl"
                    >
                      More articles
                    </h2>
                    <p className="max-w-sm text-sm text-zinc-600">
                      Browse the archive—newest first. Each post opens with reading time and a clean reading
                      layout.
                    </p>
                  </div>

                  <ul className="grid gap-8 sm:gap-10 md:grid-cols-2">
                    {rest.map((post, index) => (
                      <li key={post.slug} className="min-h-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-zinc-200/90 bg-white p-8 shadow-lg shadow-zinc-200/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-xl hover:shadow-zinc-200/50 sm:p-9"
                        >
                          <div className="mb-6 flex items-start justify-between gap-4">
                            <span
                              className="font-google-sans-code text-3xl font-light tabular-nums text-zinc-200 transition-colors duration-200 group-hover:text-primary/50"
                              aria-hidden
                            >
                              {String(index + 2).padStart(2, '0')}
                            </span>
                            {post.date && (
                              <time
                                dateTime={post.date}
                                className="shrink-0 text-xs font-medium uppercase tracking-wider text-zinc-500"
                              >
                                {formatShortDate(post.date)}
                              </time>
                            )}
                          </div>
                          <h3 className="font-bricolage-grotesque font-bold text-xl leading-snug text-zinc-900 transition-colors duration-200 group-hover:text-primary sm:text-[1.35rem]">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 sm:text-[0.9375rem]">
                              {post.excerpt}
                            </p>
                          )}
                          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors group-hover:text-primary">
                            Continue reading
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>

        {/* Bottom band */}
        <section className="border-t border-zinc-200/80 bg-gradient-to-b from-amber-50/30 to-orange-50/25 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-zinc-200/90 bg-white px-8 py-10 shadow-lg shadow-zinc-200/40 sm:flex-row sm:items-center sm:px-12 sm:py-12 lg:px-16">
              <div className="max-w-xl">
                <h2 className="font-bricolage-grotesque font-bold text-2xl text-zinc-900 sm:text-3xl">Building with Giftflow?</h2>
                <p className="mt-3 text-zinc-600">
                  Questions about Pro, exports, or your donation stack—we are happy to help you ship.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:border-primary/90 hover:bg-primary/90"
                >
                  Contact us
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/pro"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
                >
                  Explore Pro
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
