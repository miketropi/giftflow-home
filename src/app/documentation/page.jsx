export default function Documentation() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full mb-6">
          <span className="text-purple-600 font-medium text-sm">🚧 Under Construction</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Documentation
        </h1>
        
        <p className="text-md text-gray-600 max-w-2xl mx-auto mb-8">
          We're working hard to bring you comprehensive documentation. 
          Check back soon for guides, tutorials, and helpful resources.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Coming Soon</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="text-sm">In Progress</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-sm">Stay Tuned</span>
          </div>
        </div>
      </div>
      </div>
    )
}