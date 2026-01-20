import Link from 'next/link';

export default function Header() {
  // Navigation items array - easy to update
  const navigationItems = [ 
    { name: 'Home', href: '/' }, 
    { name: 'Features', href: '/' },
    // blog
    { name: 'Articles', href: '/blog' },
    { name: 'Documentation', href: '/documentation' },
    // { name: 'About', href: '#about' }, 
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                <h1 className="text-xl font-bold text-gray-900">
                  <span className="text-blue-600">Giftflow</span>
                  {process.env.NEXT_PUBLIC_PLG_VERSION && (
                    <span className="text-xs text-gray-500 ml-2 font-google-sans-code">
                      v{process.env.NEXT_PUBLIC_PLG_VERSION}
                    </span>
                  )}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block font-google-sans-code">
                  WordPress campaign management
                </p>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 font-google-sans-code"
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="https://wordpress.org/plugins/worry-proof-backup/"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Download Plugin
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <label htmlFor="mobile-menu-toggle" className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200 cursor-pointer">
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
        </div>

        {/* Mobile Navigation */}
        <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />
        <div className="hidden peer-checked:block md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2">
              <Link 
                href="https://wordpress.org/plugins/worry-proof-backup/"
                target="_blank"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                Download Plugin
              </Link>
            </div> 
          </div>
        </div>
      </div>
    </header>
  );
}