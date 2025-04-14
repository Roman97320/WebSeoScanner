import UrlInput from "@/components/UrlInput";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <UrlInput />
      
      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Our SEO & Code Analyzer?</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto">
              Tired of juggling multiple tools and complicated reports? Our all-in-one SEO solution delivers a clear, concise 
              analysis of your site's performance—so you can focus on the strategies that truly matter.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Instant Insights</h3>
              <p className="text-gray-600">No wait times. Get a snapshot of your site's health right away.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Comprehensive Coverage</h3>
              <p className="text-gray-600">Technical, on-page, and off-page factors all in a single report.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Action-Oriented</h3>
              <p className="text-gray-600">We don't just highlight issues — we show you exactly how to fix them.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">User-Friendly Interface</h3>
              <p className="text-gray-600">Designed for marketers, developers, and everyone in between.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Path to Better Rankings</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Enter Your URL</h3>
              <p className="text-gray-600">Just paste your website link into our analyzer.</p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Comprehensive Coverage</h3>
              <p className="text-gray-600 text-sm">
                Technical, on-page, and off-page factors all in a single report.
              </p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Action-Oriented Recommendations</h3>
              <p className="text-gray-600 text-sm">
                We don't just highlight issues — we show you exactly how to fix them.
              </p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">User-<span className="bg-primary text-white px-1">Friendly</span> Interface</h3>
              <p className="text-gray-600 text-sm">
                Designed for marketers, developers, and everyone in between.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Your Path to Better Rankings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800">Your Path to Better Rankings</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Enter Your URL</h3>
              <p className="text-sm text-gray-600">
                Just paste your website link into our analyzer.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Scan & Generate Report</h3>
              <p className="text-sm text-gray-600">
                Sit back while we do a deep dive on your site's SEO, code structure, and more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Review Actionable Results</h3>
              <p className="text-sm text-gray-600">
                Explore a concise, easy-to-read report that highlights any weak spots.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Implement & Succeed</h3>
              <p className="text-sm text-gray-600">
                Take targeted action to boost your visibility and track improvements over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Your All-in-One SEO Toolkit */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800">Your All-in-One SEO Toolkit</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Metadata Checker</h3>
              <p className="text-sm text-gray-600">
                Audit titles, descriptions, and keyword usage for maximum SERP impact.
              </p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Page Speed Optimization</h3>
              <p className="text-sm text-gray-600">
                Pinpoint performance bottlenecks and keep visitors (and search engines) happy.
              </p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Mobile-Friendliness</h3>
              <p className="text-sm text-gray-600">
                Ensure your website is fully responsive and meets Google's mobile-first criteria.
              </p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Security & SSL Monitoring</h3>
              <p className="text-sm text-gray-600">
                Build trust by confirming your site is secure and properly certified.
              </p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Backlink Insights</h3>
              <p className="text-sm text-gray-600">
                Track inbound links and discover areas to strengthen your site building strategy.
              </p>
            </div>
            
            <div className="border border-gray-200 p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-3">Content Optimization</h3>
              <p className="text-sm text-gray-600">
                Analyze your content for readability, keyword usage, and engagement potential.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
