import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
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
    alternates: {
      canonical: `https://worryproofbackup.com/blog/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export default async function BlogDetail({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 transition-colors duration-200 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          {post.date && (
            <div className="flex items-center text-gray-600 text-sm font-google-sans-code">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article 
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </div>
  )
}
