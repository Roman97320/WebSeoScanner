import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-primary-600 font-bold text-xl flex items-center">
              <i className="ri-search-line mr-2"></i>
              <span>Webpage SEO & Code Analyzer</span>
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link href="/">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
                Dashboard
              </button>
            </Link>
            <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              History
            </button>
            <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              Documentation
            </button>
          </div>
          <div className="flex items-center">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
