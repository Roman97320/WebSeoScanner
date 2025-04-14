const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <i className="ri-search-line text-primary text-2xl mr-2"></i>
              <h3 className="text-xl font-bold">Webpage SEO & Code Analyzer</h3>
            </div>
            <p className="text-gray-300 text-base">
              Boost your website's visibility with our comprehensive SEO audit tool. Get actionable insights to improve search rankings.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="ri-github-fill text-xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5">Features</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-primary transition-colors duration-200">On-Page SEO Analysis</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Technical Audit</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Performance Testing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Content Optimization</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Mobile Friendliness</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5">Resources</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">SEO Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-5">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-primary transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-200">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Webpage SEO & Code Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
