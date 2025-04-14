import UrlInput from "@/components/UrlInput";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <UrlInput />
      
      {/* How It Works Section */}
      <section id="how-it-works" className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Get a comprehensive analysis of your website's SEO performance in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">1</div>
              <div className="card hover:shadow-lg transition-shadow h-full">
                <div className="text-primary mb-6 text-4xl">
                  <i className="ri-link-m"></i>
                </div>
                <h3 className="font-semibold text-xl mb-3">Enter Your Website URL</h3>
                <p className="text-gray-600">
                  Provide the URL you'd like to analyze for SEO performance. We'll fetch your website data securely.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">2</div>
              <div className="card hover:shadow-lg transition-shadow h-full">
                <div className="text-primary mb-6 text-4xl">
                  <i className="ri-radar-line"></i>
                </div>
                <h3 className="font-semibold text-xl mb-3">Comprehensive Analysis</h3>
                <p className="text-gray-600">
                  Our system analyzes 20 crucial SEO elements including on-page, technical, and performance metrics.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">3</div>
              <div className="card hover:shadow-lg transition-shadow h-full">
                <div className="text-primary mb-6 text-4xl">
                  <i className="ri-file-list-3-line"></i>
                </div>
                <h3 className="font-semibold text-xl mb-3">Review & Improve</h3>
                <p className="text-gray-600">
                  Explore actionable recommendations to fix issues and enhance your site's search rankings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="section bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive SEO Analysis</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our analyzer evaluates 20 key SEO elements to help improve your search visibility
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-primary mb-6 text-4xl">
                <i className="ri-search-line"></i>
              </div>
              <h3 className="font-semibold text-xl mb-3">On-Page SEO Analysis</h3>
              <p className="text-gray-600">
                Evaluates title tags, meta descriptions, headings, content quality, keyword usage, and more for optimal on-page optimization.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-primary mb-6 text-4xl">
                <i className="ri-code-s-slash-line"></i>
              </div>
              <h3 className="font-semibold text-xl mb-3">Technical SEO Audit</h3>
              <p className="text-gray-600">
                Checks mobile-friendliness, page speed, security protocols, structured data, and code quality to ensure technical excellence.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="text-primary mb-6 text-4xl">
                <i className="ri-line-chart-line"></i>
              </div>
              <h3 className="font-semibold text-xl mb-3">Actionable Recommendations</h3>
              <p className="text-gray-600">
                Get practical suggestions to improve your website's SEO performance with clear steps for implementation.
              </p>
            </div>
          </div>
          
          <div className="mt-16 card p-8 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-2xl mb-6 text-center">Analyze These 20 Key SEO Elements</h3>
            <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Title Tags</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Meta Descriptions</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Heading Structure</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Content Quality</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>URL Structure</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Canonical Tags</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Image Optimization</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Structured Data</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Internal Linking</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>External Linking</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Social Media Tags</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Language Attributes</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Mobile-Friendliness</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Page Speed</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>HTTPS Security</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>HTML Validation</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Robots.txt</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>XML Sitemap</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>404 Handling</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-3 text-xl"></i>
                  <span>Favicon</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Professionals Worldwide</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See how our SEO analysis tool has helped businesses improve their search rankings
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Our traffic grew by 40% after implementing the recommendations from this SEO analyzer. The insights were clear and actionable."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-sm text-gray-500">E-commerce Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I was able to identify critical SEO issues that were holding back my online store. After fixing them, my conversion rate improved significantly."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Emma Rodriguez</h4>
                  <p className="text-sm text-gray-500">SEO Consultant</p>
                </div>
              </div>
              <p className="text-gray-600">
                "This tool has become an essential part of my SEO toolkit. The comprehensive analysis helps me deliver better results for my clients."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-half-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="section bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card hover:shadow-lg transition-shadow border-t-4 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-4xl font-bold">$0<span className="text-base font-normal text-gray-600">/mo</span></p>
                <p className="text-gray-600 mt-3">Basic SEO insights for personal websites</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>5 SEO analyses per month</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Basic on-page SEO analysis</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Standard recommendations</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="ri-close-line mr-2"></i>
                  <span>Historical analysis</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="ri-close-line mr-2"></i>
                  <span>Competitor comparison</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow border-t-4 border-primary transform md:-translate-y-4 z-10 shadow-lg">
              <div className="absolute -top-5 right-0 left-0 mx-auto w-36 bg-primary text-white text-sm font-bold py-1 px-2 rounded-full text-center">
                Recommended
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-4xl font-bold">$29<span className="text-base font-normal text-gray-600">/mo</span></p>
                <p className="text-gray-600 mt-3">Advanced SEO tools for businesses</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Unlimited SEO analyses</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Complete 20-point SEO audit</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Advanced recommendations</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Historical analysis</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <i className="ri-close-line mr-2"></i>
                  <span>Competitor comparison</span>
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary-hover">Go Pro</Button>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow border-t-4 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-4xl font-bold">$99<span className="text-base font-normal text-gray-600">/mo</span></p>
                <p className="text-gray-600 mt-3">Complete solution for agencies & teams</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>All Pro features</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Custom reporting & branding</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Historical analysis</span>
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-success mr-2"></i>
                  <span>Competitor comparison</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-hover">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Boost Your Website's Visibility?</h2>
          <p className="text-white/90 text-xl max-w-3xl mx-auto mb-10">
            Get started today with our comprehensive SEO analyzer and climb the search rankings.
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-foreground text-lg px-8 py-6 h-auto">
            Analyze My Site Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
