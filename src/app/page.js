import Link from 'next/link';
import { 
  Heart, 
  Users, 
  TrendingUp, 
  Shield, 
  Mail, 
  Zap, 
  CreditCard, 
  DollarSign,
  Lock,
  CheckCircle,
  Church,
  GraduationCap,
  Building2,
  Target,
  Clock,
  BarChart3,
  Settings,
  Globe
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Campaign Management',
      description: 'Create and manage multiple fundraising campaigns with ease. Set goals, track progress in real-time, and showcase your impact.'
    },
    {
      icon: Users,
      title: 'Donor Management',
      description: 'Build lasting relationships with your supporters. Track donor history, view contribution patterns, and maintain detailed records.'
    },
    {
      icon: Heart,
      title: 'Donation Processing',
      description: 'Accept donations effortlessly with streamlined forms. Smooth, intuitive checkout experience that works on any device.'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Methods',
      description: 'Accept Stripe, PayPal, and Local Bank Direct transfers. Setup is simple with no hidden fees or complicated configurations.'
    },
    {
      icon: Mail,
      title: 'Smart Email System',
      description: 'Automated email notifications for donation receipts, campaign updates, and thank you messages—all customizable.'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Built with security as a top priority. PCI compliance, industry-standard encryption, and regular security updates.'
    }
  ];

  const paymentMethods = [
    {
      name: 'Stripe',
      description: 'Credit & debit card processing',
      icon: CreditCard
    },
    {
      name: 'PayPal',
      description: 'Trusted worldwide payment solution',
      icon: DollarSign
    },
    {
      name: 'Local Bank Direct',
      description: 'Direct bank transfers for your region',
      icon: Building2
    }
  ];

  const perfectFor = [
    { icon: Heart, title: 'Non-Profit Organizations', description: 'Streamline your fundraising efforts' },
    { icon: Church, title: 'Religious Organizations', description: 'Manage tithes and offerings' },
    { icon: GraduationCap, title: 'Educational Institutions', description: 'Accept donations and sponsorships' },
    { icon: Users, title: 'Community Projects', description: 'Fund local initiatives' }
  ];

  const benefits = [
    { icon: Clock, text: 'Quick Setup - Get started in minutes' },
    { icon: Globe, text: 'Responsive Design - Works on all devices' },
    { icon: Settings, text: 'Customizable - Match your brand' },
    { icon: BarChart3, text: 'Built for Growth - Scales with you' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              WordPress Plugin for Donations, Donors & Campaigns
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Complete Donation Solution
              <br />
              <span className="text-blue-600">For WordPress</span>
            </h1>
            <p className="text-xl sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Manage donations, donors, and campaigns with modern features and extensible architecture. Everything you need in one powerful plugin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="#download"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 flex items-center"
              >
                Download Free Plugin
                <Heart className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                href="/documentation"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 border-2 border-gray-200"
              >
                View Documentation
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                WordPress 6.0+
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                PHP 8.2+
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Free & Premium Versions Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your donation management and grow your impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl border-2 border-gray-100 hover:border-blue-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Modern & Easy to Use
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools that are simple to use and beautiful to look at
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl transition-all duration-300"
                >
                  <IconComponent className="w-10 h-10 text-blue-600 mb-3" />
                  <p className="text-gray-900 font-medium">
                    {benefit.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Perfect For Organizations Like Yours
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Trusted by non-profits, charities, and organizations worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perfectFor.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <IconComponent className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-6">
                <Lock className="w-4 h-4 mr-2" />
                Enterprise-Grade Security
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Your Donors&apos; Trust is Paramount
              </h2>
              <p className="text-base text-gray-300 mb-8 leading-relaxed">
                Giftflow is built with security as a top priority. We implement industry-standard encryption, PCI compliance, and regular security updates to protect your donors&apos; sensitive information.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Secure payment processing with industry-standard encryption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">PCI compliance through trusted payment gateways</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Regular security updates and best practices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">Data protection and privacy controls</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-12 rounded-2xl backdrop-blur-sm border border-white/10">
                <Shield className="w-24 h-24 text-blue-400 mx-auto mb-6" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Protected Transactions</h3>
                  <p className="text-gray-300">
                    Every donation is processed securely with end-to-end encryption and fraud protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Donation Process?
          </h2>
          <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Install Giftflow from the WordPress plugin directory and launch your first campaign in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              href="https://wordpress.org/plugins/"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 flex items-center"
            >
              Download Free Plugin
              <Heart className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/blog"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg text-base font-semibold transition-all duration-200 border-2 border-gray-200"
            >
              Read Our Blog
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Free & Premium Versions Available
          </p>
        </div>
      </section>
    </>
  );
}
