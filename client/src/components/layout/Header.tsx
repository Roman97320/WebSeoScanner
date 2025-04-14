import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-primary font-bold text-xl flex items-center transition-colors hover:text-primary-hover">
              <i className="ri-search-line mr-2 text-2xl"></i>
              <span>Webpage SEO & Code Analyzer</span>
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <Link href="/">
              <div className="px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-background transition-colors duration-200">
                Home
              </div>
            </Link>
            <Link href="#how-it-works">
              <div className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-background transition-colors duration-200">
                How It Works
              </div>
            </Link>
            <Link href="#features">
              <div className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-background transition-colors duration-200">
                Features
              </div>
            </Link>
            <Link href="#pricing">
              <div className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-background transition-colors duration-200">
                Pricing
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:flex">
              Log In
            </Button>
            <Button className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
