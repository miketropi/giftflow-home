import Link from 'next/link'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { Calendar } from 'lucide-react'

export async function generateMetadata() {
  return {
    title: 'Our Articles',
    description: 'Our articles about WordPress plugin for donations, donors, and campaigns.',
  }
}

export default async function BlogPage() {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(slugs.map(getPostBySlug))

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0)
    const dateB = b.date ? new Date(b.date) : new Date(0)
    return dateB - dateA
  })

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
      {/* Page Header */}
      <div className=" border-b border-gray-200 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Our Articles
          </h1>
          <p className="text-gray-600 text-base font-google-sans-code">
            Our articles about WordPress backup, tips, insights, and updates.
          </p>
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts available yet.</p>
          </div>
        ) : (
          <ul className="space-y-0">
            {sortedPosts.map((post, index) => (
              <li key={post.slug} className={index !== sortedPosts.length - 1 ? 'border-b border-gray-200' : ''}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block py-6 hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed font-google-sans-code">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    {post.date && (
                      <div className="flex items-center text-gray-500 text-sm whitespace-nowrap sm:ml-6">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
