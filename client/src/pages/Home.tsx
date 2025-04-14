import UrlInput from "@/components/UrlInput";

const Home = () => {
  return (
    <>
      <UrlInput />
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive SEO Analysis</h2>
            <p className="text-lg text-gray-600">
              Our analyzer evaluates 20 key SEO elements to help improve your search visibility
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-primary-600 mb-4 text-3xl">
                <i className="ri-search-line"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">On-Page SEO Analysis</h3>
              <p className="text-gray-600 text-sm">
                Evaluates title tags, meta descriptions, headings, content quality, and more.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-primary-600 mb-4 text-3xl">
                <i className="ri-code-s-slash-line"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Technical SEO Audit</h3>
              <p className="text-gray-600 text-sm">
                Checks mobile-friendliness, page speed, security, and code quality.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-primary-600 mb-4 text-3xl">
                <i className="ri-file-list-3-line"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">Actionable Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Get practical suggestions to improve your website's SEO performance.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-xl mb-4">Analyze These 20 Key SEO Elements</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Title Tags</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Meta Descriptions</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Heading Structure</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Content Quality</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>URL Structure</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Canonical Tags</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Image Optimization</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Structured Data</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Internal Linking</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>External Linking</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Social Media Tags</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Language Attributes</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Mobile-Friendliness</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Page Speed</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>HTTPS Security</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>HTML Validation</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Robots.txt</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>XML Sitemap</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>404 Handling</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success-500 mr-2"></i>
                  <span>Favicon</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
