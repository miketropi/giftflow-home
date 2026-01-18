import { 
  Twitter, 
  Github, 
  MessageCircle, 
  Youtube, 
  Shield, 
  Rocket, 
  Heart, 
  Mail, 
  Sparkles,
  Lock
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Footer navigation items
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#', customClass: '' },
      { name: 'Download', href: '#download' },
      { name: 'Changelog', href: '#changelog' },
    ],
    support: [
      { name: 'Documentation', href: '/documentation' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' }, 
      { name: 'Contact Us', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Privacy Policy', href: '#privacy' },
    ],
  };

  const socialLinks = [
    // { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    // { name: 'Discord', href: '#', icon: MessageCircle },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                <span className="text-blue-600">Giftflow</span>
                <span className="text-gray-700"> WordPress Plugin</span>
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 font-google-sans-code">
              WordPress plugin for managing donations, donors, and campaigns with modern features and extensible architecture.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              Product <Rocket className="w-4 h-4 ml-1" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200 ${link.customClass || ''}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              Support <Heart className="w-4 h-4 ml-1" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              Company <Shield className="w-4 h-4 ml-1" />
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              Stay in the loop! <Mail className="w-5 h-5 ml-1" />
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest news, plugin updates, and WordPress donation best practices—right in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center">
                Subscribe <Sparkles className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <span className="flex items-center">
                © {currentYear} Giftflow. Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for WordPress
              </span>
              <span className="hidden sm:inline">•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#terms" className="hover:text-blue-600 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-blue-600 transition-colors duration-200">
                Cookie Policy
              </a>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <Lock className="w-3 h-3 mr-1" />
                GDPR Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}